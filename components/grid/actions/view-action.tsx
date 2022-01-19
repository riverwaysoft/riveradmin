import { css, cx } from '@emotion/css';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { useTranslate } from '../../../store/use-translate';
import { ListStore } from '../../../store/list-store';

export const ViewAction = <Model extends HasId>(props: {
  model: HasId;
  store: ListStore<Model>;
}) => {
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
