import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { css } from '@emotion/css';
import axios from 'axios';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import { trimRight } from './trim-right';

type Props = {
  // Final Form's field name
  fieldName: string;
  // API endpoint where to fetch data list for the dropdown
  endpoint: string;
  // A human-readable value to display in dropdown (object property from the dropdown list)
  labelKey: string;
  // An entity prefix (Iri) that API platform requires to send when using SearchFilter
  // Usually the Iri prefix is not different from the endpoint property.
  // But if the endpoint is custom (for example /api/visible_users), then iri prefix should still point to an entity (for example /api/users/)
  iriPrefix: string;
};

export const EntityDropdownAsyncFilter = (props: Props) => {
  const { fieldName, labelKey } = props;
  const iriPrefix = trimRight(props.iriPrefix, '/');
  const endpoint = trimRight(props.endpoint, '/');
  const [lastLabel, setLastLabel] = useState('');

  return (
    <Field name={fieldName} groupClassName={css({ marginBottom: 0 })}>
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
                    value: `${iriPrefix}/${input.value}`,
                  }
                : undefined
            }
            loadOptions={(inputValue) => {
              return axios
                .get(endpoint, {
                  params: {
                    [labelKey]: inputValue,
                  },
                })
                .then((response) =>
                  response.data['hydra:member'].map((model: any) => {
                    return {
                      label: model[labelKey],
                      value: `${iriPrefix}/${model.id}`,
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
