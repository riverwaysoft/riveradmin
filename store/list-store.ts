import { action, makeAutoObservable } from 'mobx';
import { RouterStore } from '@superwf/mobx-react-router';
import { CollectionResponse, HasId } from '../model/hydra';
import { DataProvider } from '../data-provider/data-provider';
import { assert } from 'ts-essentials';
import { Notificator } from '../notificator/notificator';
import { Translator } from '../intl/translator';
import {
  GridFilter,
  parseHydraFilters,
  unwrapNestedNotation,
  wrapNestedNotation,
} from '../components/grid/filters/filter-parser';
import { QuerySerializer } from '../routing/query-serializer';
import { omit } from 'lodash';

type Filters = {
  fullText?: string;
  page?: number;
  createdAt?: {
    after: string;
    before: string;
  };
  order?: {
    [key in string]: 'asc' | 'desc';
  };
  [key: string]: any;
};

export class ListStore<Entity extends HasId> {
  isListLoading = false;
  listData?: CollectionResponse<Entity>;
  filters: Filters = {};
  availableGridFilters: GridFilter[] = [];

  modelToDelete?: Entity;
  isRemoving = false;

  constructor(
    private dataProvider: DataProvider<Entity>,
    private routerStore: RouterStore,
    private notificator: Notificator,
    private translator: Translator,
    private querySerializer: QuerySerializer
  ) {
    makeAutoObservable(this, {
      onPageChange: false,
      submitSearchForm: false,
      listenHistory: false,
    });
  }

  loadList() {
    this.isListLoading = true;
    const filters = this.querySerializer.parseQueryParams();

    this.filters = Object.entries(filters).reduce((acc, [key, value]) => {
      return { ...acc, [wrapNestedNotation(key)]: value };
    }, {});

    const send = Object.entries(this.filters).reduce((acc, [key, value]) => {
      return { ...acc, [unwrapNestedNotation(key)]: value };
    }, {});

    this.dataProvider
      .fetchList(send)
      .then(
        action((data) => {
          this.listData = data;
          this.availableGridFilters = parseHydraFilters(data);
        })
      )
      .catch((e) => {
        throw e;
      })
      .finally(action(() => (this.isListLoading = false)));
  }

  listenHistory() {
    return this.routerStore.history.listen(() => this.loadList());
  }

  get searchFormInitialValues() {
    return {
      fullText: this.filters?.fullText,
    };
  }

  onPageChange(page: number) {
    this.routerStore.push({
      search: this.querySerializer.stringifyParams({
        ...this.filters,
        page: page,
      }),
    });
  }

  goToModelPage(model: Entity) {
    const editUrl = `${this.routerStore.location.pathname}/${model.id}`;
    this.routerStore.push(editUrl);
  }

  goToNewModelPage() {
    const createUrl = `${this.routerStore.location.pathname}/new`;
    this.routerStore.push(createUrl);
  }

  submitSearchForm = async (values: Filters) => {
    if (this.filters?.page) {
      this.filters.page = 1;
    }

    const paramsRaw = {
      ...this.filters,
      ...values,
    };

    const paramsWithDotNotation = Object.entries(paramsRaw).reduce((acc, [key, value]) => {
      return { ...acc, [unwrapNestedNotation(key)]: value };
    }, {});

    this.routerStore.push({
      search: this.querySerializer.stringifyParams(paramsWithDotNotation),
    });
  };

  askRemove(model: Entity) {
    this.modelToDelete = model;
  }

  closeRemoveModel() {
    this.modelToDelete = undefined;
  }

  get isRemoveModalOpen() {
    return !!this.modelToDelete;
  }

  get hasAvailableFilters() {
    return this.availableGridFilters.length > 0;
  }

  get availablePropertyFilters(): Array<Required<GridFilter>> {
    return this.availableGridFilters.filter(
      (gridFilter) => gridFilter.type !== 'fullText'
    ) as Array<Required<GridFilter>>;
  }

  get hasFullTextFilter() {
    return !!this.availableGridFilters.find((gridFilter) => gridFilter.type === 'fullText');
  }

  resetFilters() {
    if (!this.filters) {
      return;
    }

    this.filters = {
      fullText: this.filters.fullText,
    };

    this.onPageChange(1);
  }

  removeFilter(key: string) {
    this.filters = omit(this.filters, key);
    this.onPageChange(1);
  }

  removeModel() {
    this.isRemoving = true;
    assert(this.modelToDelete);
    this.dataProvider
      .removeOne(this.modelToDelete.id)
      .then(() => {
        this.notificator.success(this.translator.translate('riveradmin.removed'));
        this.loadList();
        this.closeRemoveModel();
      })
      .catch((error) => {
        this.notificator.error(error.message);
      })
      .finally(action(() => (this.isRemoving = false)));
  }

  setOrderBy(sortableKey: string) {
    assert(this.filters);
    let direction: 'asc' | 'desc' = 'desc';
    if (this.filters.order && this.orderByKey === sortableKey) {
      direction = this.orderByDirection === 'asc' ? 'desc' : 'asc';
    }
    this.filters.order = { [sortableKey]: direction };
    this.onPageChange(1);
  }

  get orderByKey() {
    return this.filters?.order ? Object.keys(this.filters.order)[0] : undefined;
  }

  get orderByDirection(): 'asc' | 'desc' {
    assert(this.filters);
    assert(this.filters.order);
    return Object.values(this.filters.order)[0];
  }
}
