import { css, cx } from '@emotion/css';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { useTranslate } from '../../../store/use-translate';
import { AdminTooltip } from '../../ui/tooltip';
import { ListStore } from '../../../store/list-store';

export const DeleteAction = <Model extends HasId>(props: {
  model: Model;
  store: ListStore<Model>;
}) => {
  const t = useTranslate();

  return (
    <AdminTooltip title={t('riveradmin.remove')}>
      <i
        className={cx('mdi mdi-delete text-danger', css({ cursor: 'pointer' }))}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          props.store.askRemove(props.model);
        }}
      />
    </AdminTooltip>
  );
};
