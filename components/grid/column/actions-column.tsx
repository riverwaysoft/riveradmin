import React from 'react';
import { observer } from 'mobx-react-lite';
import { CrudStore } from '../../../store/crud-store';
import { HydraMember } from '../../../model/hydra';
import { FormattedMessage } from 'react-intl';
import { AdminTooltip } from '../../ui/tooltip';

export type ActionProps<Model extends HydraMember> = {
  model: Model;
  crudStore: CrudStore<Model>;
};

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

export const ViewAction = <Model extends HydraMember>(props: ActionProps<Model>) => {
  const { crudStore, model } = props;

  return (
    <AdminTooltip title={<FormattedMessage id={'riveradmin.view'} />}>
      <i
        className={'mdi mdi-eye cursor-pointer'}
        onClick={() => {
          crudStore.goToModelPage(model);
        }}
      />
    </AdminTooltip>
  );
};

type Props<Model extends HydraMember> = {
  model: Model;
  crudStore: CrudStore<Model>;
  actions?: React.ComponentType<ActionProps<Model>>[];
};

export const ActionsColumn = observer(<Model extends HydraMember>(props: Props<Model>) => {
  const defaultActions: React.ComponentType<ActionProps<Model>>[] = [EditAction, DeleteAction];
  const { model, crudStore, actions = defaultActions } = props;

  return (
    <div className={'d-flex'} style={{ gap: '1rem' }}>
      {actions.map((Action, i) => (
        <Action key={i} model={model} crudStore={crudStore} />
      ))}
    </div>
  );
});
