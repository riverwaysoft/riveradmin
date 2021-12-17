import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { css } from '@emotion/css/macro';
import axios from 'axios';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';

type Props = {
  fieldName: string;
  labelKey: string;
  endpoint: string;
};

export const EntityDropdownAsyncFilter = (props: Props) => {
  const [lastLabel, setLastLabel] = useState('');

  return (
    <Field name={props.fieldName} groupClassName={css({ marginBottom: 0 })}>
      {({ input }) => {
        return (
          <AsyncSelect
            className={css({ minWidth: 250 })}
            cacheOptions
            defaultOptions
            onChange={debounce((e: any) => {
              input.onChange(e.value);
              // Fix stupid react-select issue: https://github.com/JedWatson/react-select/issues/3761
              setLastLabel(e.label);
            }, 300)}
            value={
              input.value
                ? {
                    label: lastLabel,
                    value: input.value,
                  }
                : undefined
            }
            loadOptions={(inputValue) => {
              return axios
                .get(props.endpoint, {
                  params: {
                    [props.labelKey]: inputValue,
                  },
                })
                .then((response) =>
                  response.data['hydra:member'].map((model: any) => {
                    return {
                      label: model[props.labelKey],
                      value: model.id,
                    };
                  })
                );
            }}
          />
        );
      }}
    </Field>
  );
};
