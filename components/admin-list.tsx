import { DateTime } from 'luxon';
import { Form as FinalForm } from 'react-final-form';
import { AdminGrid, Props as AdminGridProps } from './grid/admin-grid';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useEffect } from 'react';
import { ListStore } from '../store/list-store';
import { FilterModal } from './grid/filters/filter-modal';
import { formatDateRange } from './grid/filters/format-date-range';
import { GridSearch } from './grid/search';
import { Button } from 'react-bootstrap';
import { HasId } from '../model/hydra';
import { css } from '@emotion/css';
import { useTranslate } from '../store/use-translate';
import { useLocation } from 'react-router';
import { useDocumentTitle } from '../routing/use-document-title';

type Props<Entity extends HasId> = {
  listStore: ListStore<Entity>;
  title: string;
  create?: boolean;
  columns: AdminGridProps<Entity>['columns'];
  isRowInactive?: AdminGridProps<Entity>['isRowInactive'];
  slotTop?: ReactNode;
};

export const AdminList = observer(<Entity extends HasId>(props: Props<Entity>) => {
  const { listStore, columns, title, create, isRowInactive } = props;
  useDocumentTitle(title);
  const t = useTranslate();
  const location = useLocation();

  useEffect(() => {
    listStore.loadList();
  }, [listStore, location]);

  return (
    <div className={css({ display: 'flex', flexDirection: 'column' })}>
      <h4>{title}</h4>
      {props.slotTop}
      <div className={css({ display: 'flex', width: '100%', marginBottom: '1.5rem' })}>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginRight: '1rem',
          })}
        >
          {listStore.hasAvailableFilters && (
            <FinalForm initialValues={listStore.filters} onSubmit={listStore.submitSearchForm}>
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className={css({ display: 'flex', alignItems: 'center', gap: 16 })}>
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

                            if (filterTypeByKey.type === 'range') {
                              // @ts-ignore
                              const { gte, lte } = value;
                              const joinWith = Boolean(lte && gte);

                              return (
                                <Button key={key}>
                                  {t(`riveradmin.filters.labels.${key}`)}{' '}
                                  {gte ? (
                                    <>
                                      {t(`riveradmin.filters.gte`)} {gte}
                                    </>
                                  ) : null}
                                  {joinWith ? ' AND ' : ''}
                                  {lte ? (
                                    <>
                                      {t(`riveradmin.filters.lte`)} {lte}
                                    </>
                                  ) : null}
                                  <i
                                    className={'mdi mdi-close'}
                                    onClick={() => {
                                      listStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
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
                                  {t(`riveradmin.filters.labels.${key}`)}
                                  <i
                                    className={'mdi mdi-close'}
                                    onClick={() => {
                                      listStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
                            }

                            if (filterTypeByKey.type === 'input') {
                              return (
                                <Button key={key}>
                                  {t(`riveradmin.filters.labels.${key}`)}: {value}
                                  <i
                                    className={'mdi mdi-close'}
                                    onClick={() => {
                                      listStore.removeFilter(key);
                                    }}
                                  />
                                </Button>
                              );
                            }

                            if (filterTypeByKey.type === 'enum') {
                              const enumValue = Object.entries(filterTypeByKey.enum).find(
                                ([_, v]) => v.toString() === value.toString()
                              )?.[0];

                              return (
                                <Button key={key}>
                                  {t(`riveradmin.filters.labels.${key}`)}: {enumValue}
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
              {t('riveradmin.create')}
            </Button>
          )}
        </div>
      </div>
      <AdminGrid columns={columns} listStore={listStore} isRowInactive={isRowInactive} />
    </div>
  );
});
