import { observer } from 'mobx-react-lite';
import React from 'react';
import { Field } from 'react-final-form';
import { InputAdapter } from '../ui/input-adapter';
import { css } from '@emotion/css';
import { useTranslate } from '../../store/use-translate';

export const GridSearch = observer(() => {
  const t = useTranslate();

  return (
    <Field
      name={'fullText'}
      groupClassName={css({ marginBottom: '0 !important' })}
      component={InputAdapter}
      placeholder={t('riveradmin.search')}
    />
  );
});
