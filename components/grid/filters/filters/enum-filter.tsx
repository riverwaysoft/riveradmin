import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import { css } from '@emotion/css';

type Props = {
  fieldName: string;
  dropdown: { [key in string]: number };
};

export const EnumFilter = (props: Props) => {
  return (
    <Field name={props.fieldName} groupClassName={css({ marginBottom: 0 })}>
      {({ input }) => {
        const options = Object.entries(props.dropdown).map(([key, value]) => ({
          value: value,
          label: key,
        }));

        return (
          <Select
            className={css({ minWidth: 250 })}
            // @ts-ignore
            value={options.filter((option) => option.value.toString() === input.value.toString())}
            onChange={(e) => {
              // @ts-ignore
              input.onChange(e.value);
            }}
            options={options}
          />
        );
      }}
    </Field>
  );
};
