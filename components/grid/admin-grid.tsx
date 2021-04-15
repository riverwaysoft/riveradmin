import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react-lite';
import { HydraMember } from '../../model/hydra';
import { AdminGridNoResults } from './admin-grid-not-result';
import { AdminGridPagination } from './admin-grid-pagination';
import { Table } from 'react-bootstrap';
import { CrudStore } from '../../store/crud-store';
import { FormattedMessage } from 'react-intl';
import { ConfirmModal } from '../ui/confirm-modal';
import classNames from 'classnames';

export type Props<Entity extends HydraMember> = {
  columns: {
    label: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    render: (item: Entity) => React.ReactNode | string | null;
    sortableKey?: string;
  }[];
  crudStore: CrudStore<Entity>;
};

export const AdminGrid = observer(<Entity extends HydraMember>(props: Props<Entity>) => {
  const { columns, crudStore } = props;
  const value = crudStore.listData;
  const renderPagination = () => {
    if (value && value['hydra:view']) {
      const viewMeta = value['hydra:view'];
      const totalItems =value['hydra:totalItems'];
      const reg = new RegExp(/page=([0-9]+)/);

      const currentMatch = viewMeta['@id'].match(reg);
      if (!currentMatch) return;
      const currentPage = currentMatch[1];

      const pagesMatcher = viewMeta['hydra:last'].match(reg);
      if (pagesMatcher && pagesMatcher[1] && parseInt(pagesMatcher[1]) > 1) {
        return (
          <AdminGridPagination
            currentPage={parseInt(currentPage)}
            totalItems={totalItems}
            totalPages={parseInt(pagesMatcher[1])}
            onChange={(page) => crudStore.onPageChange(page)}
          />
        );
      }
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
                      crudStore.setOrderBy(column.sortableKey);
                    }
                  }}
                  className={classNames('d-flex align-items-center', {
                    'cursor-pointer': column.sortableKey,
                    'text-nowrap': column.sortableKey,
                    'text-primary':
                      column.sortableKey && crudStore.orderByKey === column.sortableKey,
                  })}
                  style={{ gap: '0.25rem' }}
                >
                  <span>
                    {column.sortableKey ? (
                      crudStore.orderByKey === column.sortableKey ? (
                        crudStore.orderByDirection === 'asc' ? (
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
          {crudStore.isListLoading &&
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
            (value['hydra:member'] || []).map((model: Entity) => {
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
        isOpen={crudStore.isRemoveModalOpen}
        title={<FormattedMessage id={'riveradmin.delete.ask'} />}
        body={<FormattedMessage id={'riveradmin.delete.confirm'} />}
        cancelLabel={<FormattedMessage id={'riveradmin.delete.cancel'} />}
        confirmLabel={<FormattedMessage id={'riveradmin.delete.confirm-label'} />}
        onCancel={() => crudStore.closeRemoveModel()}
        onConfirm={() => crudStore.removeModel()}
        isLoading={crudStore.isRemoving}
      />
    </div>
  );
});
