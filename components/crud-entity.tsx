import { DateTime } from 'luxon';
import { Form as FinalForm } from 'react-final-form';
import useDocumentTitle from 'use-document-title';
import { HydraMember } from '../model/hydra';
import { AdminGrid, Props as AdminGridProps } from './grid/admin-grid';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { CrudStore } from '../store/crud-store';
import { FilterModal } from './grid/filters/filter-modal';
import { formatDateRange } from './grid/filters/format-date-range';
import { GridSearch } from './grid/search';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

type Props<Entity extends HydraMember> = {
  crudStore: CrudStore<Entity>;
  grid: Pick<AdminGridProps<Entity>, 'columns'>;
  title: string;
  create?: boolean;
};

export const CrudEntity = observer(<Entity extends HydraMember>(props: Props<Entity>) => {
  const { crudStore, grid, title, create } = props;

  useDocumentTitle(title);

  useEffect(() => {
    crudStore.loadList();
    return crudStore.listenHistory();
  }, [crudStore]);

  return (
    <div className={'d-flex flex-column'}>
      <h4>{title}</h4>
      <div className={'d-flex w-100 mb-3'}>
        <div className={'d-flex justify-content-between w-100 mr-2'}>
          {crudStore.hasAvailableFilters && (
            <FinalForm initialValues={crudStore.filters} onSubmit={crudStore.submitSearchForm}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className={'d-flex align-items-center'} style={{ gap: '1rem' }}>
                    {crudStore.hasFullTextFilter && <GridSearch />}
                    {crudStore.filters
                      ? Object.entries(crudStore.filters)
                          .filter(([key]) => key !== 'fullText' && key !== 'page')
                          .map(([key, value]) => {
                            if (key === 'createdAt') {
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
                                      crudStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
                            }
                            return null;
                          })
                      : null}
                    {crudStore.availablePropertyFilters.length > 0 && (
                      <FilterModal crudStore={crudStore} />
                    )}
                  </div>
                </form>
              )}
            </FinalForm>
          )}
          {create && (
            <Button
              onClick={() => {
                crudStore.goToNewModelPage();
              }}
            >
              <FormattedMessage id={'riveradmin.create'} />
            </Button>
          )}
        </div>
      </div>
      <AdminGrid columns={grid.columns} crudStore={crudStore} />
    </div>
  );
});
