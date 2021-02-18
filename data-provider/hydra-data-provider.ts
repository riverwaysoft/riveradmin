import { QuerySerializer } from '../routing/query-serializer';
import { DataProvider } from './data-provider';
import { CollectionResponse, HydraMember } from '../model/hydra';
import { AxiosInstance } from 'axios';
import { assert } from 'ts-essentials';

export class HydraDataProvider<T extends HydraMember> implements DataProvider<T> {
  constructor(
    private axios: AxiosInstance,
    private querySerializer: QuerySerializer,
    private listEndpoint: string,
    private deleteEndpoint?: string
  ) {
    assert(
      listEndpoint.startsWith('/'),
      "Hydra endpoint shouldn't start with /. Please remove it from the beginning"
    );
    assert(
      !listEndpoint.endsWith('/'),
      "Hydra endpoint shouldn't end with /. Please remove it from the end"
    );
  }

  fetchList(filters?: object): Promise<CollectionResponse<T>> {
    const isFilterEmpty = !filters || Object.keys(filters).length === 0;

    return this.axios
      .get(
        isFilterEmpty
          ? this.listEndpoint
          : `${this.listEndpoint}?${this.querySerializer.stringifyParams(filters!)}`
      )
      .then((response) => response.data);
  }

  removeOne(id: string): Promise<unknown> {
    return this.axios
      .delete(`${this.deleteEndpoint || this.listEndpoint}/${id}`)
      .then((response) => response.data);
  }
}
