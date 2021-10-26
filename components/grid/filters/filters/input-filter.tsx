import React from 'react';
import { Field } from 'react-final-form';
import { InputAdapter } from '../../../ui/input-adapter';
import { css } from '@emotion/css/macro';

type Props = {
  fieldName: string;
};

export const InputFilter = (props: Props) => {
  const { fieldName } = props;

  return (
    <Field
      name={fieldName}
      groupClassName={css({ marginBottom: '0 !important' })}
      component={InputAdapter}
    />
  );
};
