import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const DeleteAction = <Model extends HasId>(props: ActionProps<Model>) => {
  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.remove'} />}>
      <i
        className={'mdi mdi-delete text-danger cursor-pointer'}
        onClick={() => {
          props.store.askRemove(props.model);
        }}
      />
    </AdminTooltip>
  );
};
