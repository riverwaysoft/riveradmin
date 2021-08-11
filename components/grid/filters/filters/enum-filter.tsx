import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import { css } from '@emotion/css/macro';

type Props = {
  fieldName: string;
  dropdown: { [key in string]: number };
};

export const EnumFilter = (props: Props) => {
  return (
    <Field name={props.fieldName} groupClassName={'mb-0'}>
      {({ input }) => {
        const options = Object.entries(props.dropdown).map(([key, value]) => ({
          value: value,
          label: key,
        }));

        return (
          <Select
            className={css`
              min-width: 250px;
            `}
            // @ts-ignore
            value={options.filter((option) => Number(option.value) === Number(input.value))}
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
