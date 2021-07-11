import { observer } from 'mobx-react-lite';
import React from 'react';
import { HasId } from '../../../model/hydra';
import { ListStore } from '../../../store/list-store';

export type ActionProps<Model extends HasId> = {
  model: Model;
  store: ListStore<Model>;
};

type Props = {
  actions: React.ReactElement[];
};

export const ActionsColumn = observer((props: Props) => {
  return (
    <div className={'d-flex'} style={{ gap: '1rem' }}>
      {props.actions}
    </div>
  );
});
