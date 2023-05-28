import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { css } from '@emotion/css';
import axios from 'axios';
import { debounce } from 'lodash';
import AsyncSelect from 'react-select/async';
import { trimRight } from './trim-right';
import { HasId } from '../../../../model/hydra';

type DefaultOption = { label: string; value: string };

type Props<Model extends HasId, Option extends DefaultOption> = {
  // Final Form's field name
  fieldName: string;
  // API endpoint where to fetch data list for the dropdown
  endpoint: string;
  // A human-readable value to display in dropdown (object property from the dropdown list)
  labelKey: keyof Model | string;
  labelKeyComputed?: (model: Model) => string;
  // An entity prefix (Iri) that API platform requires to send when using SearchFilter
  // Usually the Iri prefix is not different from the endpoint property.
  // But if the endpoint is custom (for example /api/visible_users), then iri prefix should still point to an entity (for example /api/users/)
  iriPrefix: string;
  isDisabled?: boolean;
  filter?: (model: Model) => boolean;
  defaultLabel?: string;
  onSelected?: (option: Option) => void;
  mapper?: (model: Model) => Option;
  isClearable?: boolean;
};

export const EntityDropdownAsyncFilter = <Model extends HasId, Option extends DefaultOption = DefaultOption>(
  props: Props<Model, Option>
) => {
  const { fieldName, labelKey, labelKeyComputed, isDisabled, filter, isClearable } = props;
  const iriPrefix = trimRight(props.iriPrefix, '/');
  const endpoint = trimRight(props.endpoint, '/');
  const [lastLabel, setLastLabel] = useState(() => props.defaultLabel || '');

  return (
    <Field name={fieldName} groupClassName={css({ marginBottom: 0 })}>
      {({ input }) => {
        return (
          <AsyncSelect
            className={css({ minWidth: 250 })}
            cacheOptions
            defaultOptions={filter ? undefined : true}
            isDisabled={isDisabled}
            isClearable={isClearable}
            onChange={debounce((e: any) => {
              if (e) {
                input.onChange(e.value);
                // Fix stupid react-select issue: https://github.com/JedWatson/react-select/issues/3761
                setLastLabel(e.label);
              } else {
                input.onChange(null);
              }
              props.onSelected?.(e);
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
                .then((response) => {
                  const data = response.data['hydra:member'];
                  const filteredData = filter ? data.filter(filter) : data;
                  const mapper =
                    props.mapper ??
                    ((model) => {
                      return {
                        label: labelKeyComputed ? labelKeyComputed(model) : (model as any)[labelKey],
                        value: `${iriPrefix}/${model.id}`,
                      };
                    });

                  return filteredData.map(mapper);
                });
            }}
          />
        );
      }}
    </Field>
  );
};
