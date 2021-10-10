import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react-lite';
import { HasId } from '../../model/hydra';
import { AdminGridNoResults } from './admin-grid-not-result';
import { AdminGridPagination } from './pagination/admin-grid-pagination';
import { Table } from 'react-bootstrap';
import { ListStore } from '../../store/list-store';
import { FormattedMessage } from 'react-intl';
import { ConfirmModal } from '../ui/confirm-modal';
import classNames from 'classnames';
import { parsePagination } from './pagination/parse-pagination';

export type Props<Model extends HasId> = {
  columns: {
    label: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    render: (item: Model) => React.ReactNode | string | null;
    sortableKey?: string;
  }[];
  listStore: ListStore<Model>;
};

export const AdminGrid = observer(<Model extends HasId>(props: Props<Model>) => {
  const { columns, listStore } = props;
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
                  className={classNames('d-flex align-items-center', {
                    'cursor-pointer': column.sortableKey,
                    'text-nowrap': column.sortableKey,
                    'text-primary':
                      column.sortableKey && listStore.orderByKey === column.sortableKey,
                  })}
                  style={{ gap: '0.25rem' }}
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
            (value['hydra:member'] || []).map((model: Model) => {
              return (
                <tr key={model.id}>
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
        title={<FormattedMessage id={'riveradmin.delete.ask'} />}
        body={<FormattedMessage id={'riveradmin.delete.confirm'} />}
        cancelLabel={<FormattedMessage id={'riveradmin.delete.cancel'} />}
        confirmLabel={<FormattedMessage id={'riveradmin.delete.confirm-label'} />}
        onCancel={() => listStore.closeRemoveModel()}
        onConfirm={() => listStore.removeModel()}
        isLoading={listStore.isRemoving}
      />
    </div>
  );
});
