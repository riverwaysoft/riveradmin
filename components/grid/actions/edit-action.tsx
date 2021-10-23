import React from 'react';
import { FormattedMessage } from 'react-intl';
import { HasId } from '../../../model/hydra';
import { AdminTooltip } from '../../ui/tooltip';
import { ActionProps } from '../column/actions-column';

export const EditAction = <Model extends HasId>(props: ActionProps<Model>) => {
  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.open-edit'} />}>
      <i
        className={'mdi mdi-pencil cursor-pointer'}
        onClick={(event) => {
          event.stopPropagation();
          props.store.goToModelPage(props.model);
        }}
      />
    </AdminTooltip>
  );
};
