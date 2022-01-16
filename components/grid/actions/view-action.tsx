import { css, cx } from '@emotion/css';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';
import { useTranslate } from '../../../store/use-translate';

export const ViewAction = <Model extends HasId>(props: ActionProps<Model>) => {
  const t = useTranslate();

  return (
    <AdminTooltip title={t('riveradmin.view')}>
      <i
        className={cx('mdi mdi-eye', css({ cursor: 'pointer' }))}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          props.store.goToModelPage(props.model);
        }}
      />
    </AdminTooltip>
  );
};
