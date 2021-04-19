import React from 'react';
import { Field } from 'react-final-form';
import { RadioSwitcher } from '../../../ui/radio-switcher/radio-switcher';

type Props = {
  fieldName: string;
};

export const BoolFilter = (props: Props) => {
  const { fieldName } = props;

  return (
    <Field name={fieldName} groupClassName={'mb-0'}>
      {({ input }) => (
        <RadioSwitcher
          isOn={input.value === '1'}
          onToggle={() => {
            input.onChange(input.value === '1' ? '0' : '1');
          }}
        />
      )}
    </Field>
  );
};
