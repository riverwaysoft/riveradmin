import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HydraMember } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const EditAction = <Model extends HydraMember>(props: ActionProps<Model>) => {
  const { crudStore, model } = props;

  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.open-edit'} />}>
      <i
        className={'mdi mdi-pencil cursor-pointer'}
        onClick={() => {
          crudStore.goToModelPage(model);
        }}
      />
    </AdminTooltip>
  );
};
