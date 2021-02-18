import { observer } from 'mobx-react-lite';
import React from 'react';
import { Field } from 'react-final-form';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { InputAdapter } from '../ui/input-adapter';

export const GridSearch = observer(() => {
  const { translator } = useRiverAdminStore();

  return (
    <Field
      name={'fullText'}
      groupClassName={'mb-0'}
      component={InputAdapter}
      placeholder={translator.translate('riveradmin.search')}
    />
  );
});
