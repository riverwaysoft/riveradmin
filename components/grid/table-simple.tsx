import React from 'react';
import { observer } from 'mobx-react-lite';
import { IPromiseBasedObservable } from 'mobx-utils/lib/from-promise';
import { Table } from 'react-bootstrap';
import { Loader } from './loader';
import { css } from '@emotion/css';
import { useTranslate } from '../../store/use-translate';

type Props<T extends any> = {
  models?: IPromiseBasedObservable<T[]> | T[];
  isLoading?: boolean;
  columns: {
    label: string | React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    render: (item: T) => React.ReactNode | string | null;
  }[];
  onRowClick?: (model: T) => void;
};

export const TableSimple = observer(<T extends any>(props: Props<T>) => {
  const { models, columns, isLoading } = props;
  const t = useTranslate();

  if (!models) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
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
              <p>{t('No items matched your search')}</p>
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
});
