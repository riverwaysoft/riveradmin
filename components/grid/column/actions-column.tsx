import { observer } from 'mobx-react-lite';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { CrudStore } from '../../../store/crud-store';
import { DeleteAction } from '../actions/delete-action';
import { EditAction } from '../actions/edit-action';

export type ActionProps<Model extends HasId> = {
  model: Model;
  crudStore: CrudStore<Model>;
};

type Props<Model extends HasId> = {
  model: Model;
  crudStore: CrudStore<Model>;
  actions?: React.ComponentType<ActionProps<Model>>[];
};

export const ActionsColumn = observer(<Model extends HasId>(props: Props<Model>) => {
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
