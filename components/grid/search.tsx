import { observer } from 'mobx-react-lite';
import React from 'react';
import { Field } from 'react-final-form';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { InputAdapter } from '../ui/input-adapter';
import { css } from '@emotion/css/macro';

export const GridSearch = observer(() => {
  const { translator } = useRiverAdminStore();

  return (
    <Field
      name={'fullText'}
      groupClassName={css({ marginBottom: '0 !important' })}
      component={InputAdapter}
      placeholder={translator.translate('riveradmin.search')}
    />
  );
});
