import React from 'react';
import { observer } from 'mobx-react-lite';
import { IPromiseBasedObservable } from 'mobx-utils/lib/from-promise';
import { Table } from 'react-bootstrap';
import { Loader } from '../../../admin/pages/shared/loader/loader';
import { css } from '@emotion/css';

export const TableSimple = observer(
  <T extends any>(props: {
    models?: IPromiseBasedObservable<T[]> | T[];
    columns: {
      label: string | React.ReactNode;
      onClick?: (e: React.MouseEvent<HTMLElement>) => void;
      render: (item: T) => React.ReactNode | string | null;
    }[];
    onRowClick?: (model: T) => void;
  }) => {
    const { models, columns } = props;

    if (!models) {
      return null;
    }

    if (!Array.isArray(models) && models.state === 'pending') {
      return <Loader />;
    }

    if (!Array.isArray(models) && models.state === 'rejected') {
      return null;
    }

    const value = Array.isArray(models) ? models : models.value;

    return (
      <Table responsive>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <td key={i}>{column.label}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.length === 0 && (
            <tr>
              <td className={css({ width: '100%', textAlign: 'center' })} colSpan={columns.length}>
                The list is empty
              </td>
            </tr>
          )}
          {value.map((model, i) => (
            <tr key={i}>
              {columns.map((column, j) => (
                <td
                  key={j}
                  onClick={() => {
                    props.onRowClick?.(model);
                  }}
                >
                  {column.render(model)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
);
