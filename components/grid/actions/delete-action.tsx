import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HydraMember } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const DeleteAction = <Model extends HydraMember>(props: ActionProps<Model>) => {
  const { crudStore, model } = props;

  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.remove'} />}>
      <i
        className={'mdi mdi-delete text-danger cursor-pointer'}
        onClick={() => {
          crudStore.askRemove(model);
        }}
      />
    </AdminTooltip>
  );
};
