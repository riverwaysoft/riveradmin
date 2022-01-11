import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react-lite';
import { HasId } from '../../model/hydra';
import { AdminGridNoResults } from './admin-grid-not-result';
import { AdminGridPagination } from './pagination/admin-grid-pagination';
import { Table } from 'react-bootstrap';
import { ListStore } from '../../store/list-store';
import { ConfirmModal } from '../ui/confirm-modal';
import { parsePagination } from './pagination/parse-pagination';
import { css, cx } from '@emotion/css';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { useTranslate } from '../../store/use-translate';
import { Link } from 'react-router-dom';
import { reset } from '../../css/reset';

export type Props<Model extends HasId> = {
  columns: {
    label: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    render: (item: Model) => JSX.Element | number | string | null | undefined;
    sortableKey?: string;
  }[];
  isRowInactive?: boolean;
  listStore: ListStore<Model>;
};

export const AdminGrid = observer(<Model extends HasId>(props: Props<Model>) => {
  const { columns, listStore } = props;
  const t = useTranslate();
  const { config } = useRiverAdminStore();
  // To determine the value of isRowClickableEnabled we look in config.isRowClickableEnabled
  // If this option is enabled every table row become clickable
  // But for some cases it's not desired behaviour. For example when entity doesn't have a separate form page
  // So we can override global config option with props.isRowInactive for specific grid
  const isRowClickableEnabled = config.isRowClickableEnabled && !props.isRowInactive;
  const value = listStore.listData;

  const renderPagination = () => {
    const paginationResult = parsePagination(value);
    if (paginationResult) {
      return (
        <AdminGridPagination
          currentPage={paginationResult.currentPage}
          totalItems={paginationResult.totalItems}
          totalPages={paginationResult.totalPages}
          onChange={(page) => listStore.onPageChange(page)}
        />
      );
    }
  };

  if (value && value['hydra:member'] === undefined) {
    console.error('RiverAdmin error: invalid response from API. Key hydra:member is required');
  }

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={i}>
                <div
                  onClick={() => {
                    if (column.sortableKey) {
                      listStore.setOrderBy(column.sortableKey);
                    }
                  }}
                  className={cx(
                    css({ display: 'flex', alignItems: 'center', gap: '0.25rem' }),
                    !!column.sortableKey && css({ cursor: 'pointer', whiteSpace: 'nowrap' }),
                    !!column.sortableKey &&
                      listStore.orderByKey === column.sortableKey &&
                      css({ color: 'var(--primary)' })
                  )}
                >
                  <span>
                    {column.sortableKey ? (
                      listStore.orderByKey === column.sortableKey ? (
                        listStore.orderByDirection === 'asc' ? (
                          <i className={'mdi mdi-sort-ascending'} />
                        ) : (
                          <i className={'mdi mdi-sort-descending'} />
                        )
                      ) : (
                        <i className={'mdi mdi-sort text-secondary'} />
                      )
                    ) : null}
                  </span>
                  <span>{column.label}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listStore.isListLoading &&
            Array(20)
              .fill(null)
              .map((_, i) => (
                <tr key={i}>
                  <td colSpan={columns.length}>
                    <div className={'skeleton'}>
                      <Skeleton />
                    </div>
                  </td>
                </tr>
              ))}
          {value && value['hydra:member']?.length === 0 && (
            <tr>
              <td colSpan={columns.length}>
                <AdminGridNoResults />
              </td>
            </tr>
          )}
          {value &&
            (value['hydra:member'] || []).map((model) => {
              if (!isRowClickableEnabled) {
                return (
                  <tr key={model.id}>
                    {columns.map((column, i) => (
                      <td key={i} onClick={column.onClick}>
                        {column.render(model)}
                      </td>
                    ))}
                  </tr>
                );
              }

              return (
                <tr
                  key={model.id}
                  className={css({ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.075)' } })}
                >
                  {columns.map((column, i) => (
                    <td
                      className={css({ padding: '0 !important' })}
                      key={i}
                      onClick={column.onClick}
                    >
                      <Link
                        key={model.id}
                        to={listStore.getModelPageUrl(model)}
                        className={cx(
                          reset.a,
                          css({
                            // Make the whole <td> clickable by expanding <a> to take all the available space within parent tag
                            display: 'block',
                            height: '100%',
                            // When cell is empty we need to provide min height somehow
                            minHeight: 48,
                            padding: '.75rem',
                          })
                        )}
                      >
                        {column.render(model)}
                      </Link>
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </Table>
      {renderPagination()}
      <ConfirmModal
        isOpen={listStore.isRemoveModalOpen}
        title={t('riveradmin.delete.ask')}
        body={t('riveradmin.delete.confirm')}
        cancelLabel={t('riveradmin.delete.cancel')}
        confirmLabel={t('riveradmin.delete.confirm-label')}
        onCancel={() => listStore.closeRemoveModel()}
        onConfirm={() => listStore.removeModel()}
        isLoading={listStore.isRemoving}
      />
    </div>
  );
});
