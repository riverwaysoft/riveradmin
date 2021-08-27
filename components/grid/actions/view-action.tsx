import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const ViewAction = <Model extends HasId>(props: ActionProps<Model>) => {
  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.view'} />}>
      <i
        className={'mdi mdi-eye cursor-pointer'}
        onClick={() => {
          props.store.goToModelPage(props.model);
        }}
      />
    </AdminTooltip>
  );
};
