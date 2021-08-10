import React from 'react';
import { Field } from 'react-final-form';
import { InputAdapter } from '../../../ui/input-adapter';

type Props = {
  fieldName: string;
};

export const InputFilter = (props: Props) => {
  const { fieldName } = props;

  return <Field name={fieldName} groupClassName={'mb-0'} component={InputAdapter} />;
};
