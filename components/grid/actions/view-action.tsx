import { cx } from '@emotion/css';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';
import { css } from '@emotion/css/macro';

export const ViewAction = <Model extends HasId>(props: ActionProps<Model>) => {
  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.view'} />}>
      <i
        className={cx('mdi mdi-eye', css({ cursor: 'pointer' }))}
        onClick={(event) => {
          event.stopPropagation();
          props.store.goToModelPage(props.model);
        }}
      />
    </AdminTooltip>
  );
};
