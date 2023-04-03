import { css, cx } from '@emotion/css';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { useTranslate } from '../../../store/use-translate';
import { AdminTooltip } from '../../ui/tooltip';

export const DeleteAction = <Model extends HasId>(props: {
  model: Model;
  store: { askRemove: (model: Model) => void };
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
