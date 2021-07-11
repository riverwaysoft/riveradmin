import { DateTime } from 'luxon';
import { Form as FinalForm } from 'react-final-form';
import useDocumentTitle from 'use-document-title';
import { AdminGrid, Props as AdminGridProps } from './grid/admin-grid';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { ListStore } from '../store/list-store';
import { FilterModal } from './grid/filters/filter-modal';
import { formatDateRange } from './grid/filters/format-date-range';
import { GridSearch } from './grid/search';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../model/hydra';

type Props<Entity extends HasId> = {
  listStore: ListStore<Entity>;
  title: string;
  create?: boolean;
  columns: AdminGridProps<Entity>['columns'];
};

export const AdminList = observer(<Entity extends HasId>(props: Props<Entity>) => {
  const { listStore, columns, title, create } = props;

  useDocumentTitle(title);

  useEffect(() => {
    listStore.loadList();
    return listStore.listenHistory();
  }, [listStore]);

  return (
    <div className={'d-flex flex-column'}>
      <h4>{title}</h4>
      <div className={'d-flex w-100 mb-3'}>
        <div className={'d-flex justify-content-between w-100 mr-2'}>
          {listStore.hasAvailableFilters && (
            <FinalForm initialValues={listStore.filters} onSubmit={listStore.submitSearchForm}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className={'d-flex align-items-center'} style={{ gap: '1rem' }}>
                    {listStore.hasFullTextFilter && <GridSearch />}
                    {listStore.filters
                      ? Object.entries(listStore.filters)
                          .filter(([key]) => key !== 'fullText' && key !== 'page')
                          .map(([key, value]) => {
                            const filterTypeByKey = listStore.availablePropertyFilters.find(
                              (filter) => filter.property === key
                            );
                            if (!filterTypeByKey) {
                              console.error(`Filter with key ${key} not found`);
                              return null;
                            }

                            if (filterTypeByKey.type === 'date') {
                              const range: [Date, Date] = [
                                // @ts-ignore
                                DateTime.fromSQL(value.after).toJSDate(),
                                // @ts-ignore
                                DateTime.fromSQL(value.before).toJSDate(),
                              ];

                              return (
                                <Button key={key}>
                                  {formatDateRange(range)}{' '}
                                  <i
                                    className={'mdi mdi-close'}
                                    onClick={() => {
                                      listStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
                            }

                            if (filterTypeByKey.type === 'bool' && value !== '0') {
                              return (
                                <Button key={key}>
                                  <FormattedMessage id={`riveradmin.filters.labels.${key}`} />
                                  <i
                                    className={'mdi mdi-close'}
                                    onClick={() => {
                                      listStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
                            }

                            return null;
                          })
                      : null}
                    {listStore.availablePropertyFilters.length > 0 && (
                      <FilterModal listStore={listStore} />
                    )}
                  </div>
                </form>
              )}
            </FinalForm>
          )}
          {create && (
            <Button
              onClick={() => {
                listStore.goToNewModelPage();
              }}
            >
              <FormattedMessage id={'riveradmin.create'} />
            </Button>
          )}
        </div>
      </div>
      <AdminGrid columns={columns} listStore={listStore} />
    </div>
  );
});
