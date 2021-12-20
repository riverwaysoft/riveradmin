import { css, cx } from '@emotion/css/macro';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { useTranslate } from '../../../store/use-translate';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const DeleteAction = <Model extends HasId>(props: ActionProps<Model>) => {
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
