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
import { css, cx } from '@emotion/css/macro';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { useTranslate } from '../../store/use-translate';

export type Props<Model extends HasId> = {
  columns: {
    label: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    render: (item: Model) => React.ReactNode | string | null;
    sortableKey?: string;
  }[];
  isRowInactive?: boolean;
  listStore: ListStore<Model>;
};

export const AdminGrid = observer(<Model extends HasId>(props: Props<Model>) => {
  const { columns, listStore } = props;
  const t = useTranslate();
  const { config } = useRiverAdminStore();
  const isRowClickableEnabled = props.isRowInactive ? false : config.isRowClickableEnabled;
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
              return (
                <tr
                  key={model.id}
                  className={cx(
                    isRowClickableEnabled &&
                      css({
                        '&:hover': { cursor: 'pointer', backgroundColor: 'rgba(0, 0, 0, 0.075)' },
                      })
                  )}
                  onClick={
                    isRowClickableEnabled
                      ? () => {
                          listStore.goToModelPage(model);
                        }
                      : undefined
                  }
                >
                  {columns.map((column, i) => (
                    <td key={i} onClick={column.onClick}>
                      {column.render(model)}
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
