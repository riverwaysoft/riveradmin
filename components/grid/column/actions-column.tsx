import { css } from '@emotion/css';
import { observer } from 'mobx-react-lite';
import React, { ReactNode } from 'react';
import { HasId } from '../../../model/hydra';
import { ListStore } from '../../../store/list-store';

export const ActionsColumn = observer((props: { children: ReactNode }) => {
  return <div className={css({ display: 'flex', gap: 16 })}>{props.children}</div>;
});
