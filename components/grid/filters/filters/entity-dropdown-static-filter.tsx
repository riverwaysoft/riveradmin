import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import { css } from '@emotion/css';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { fromPromise } from 'mobx-utils';
import axios from 'axios';
import { CollectionResponse } from '../../../../model/hydra';

type Props = {
  fieldName: string;
  labelKey: string;
  endpoint: string;
  removeIri: boolean;
};

export const EntityDropdownStaticFilter = observer((props: Props) => {
  const state = useLocalObservable(() => ({
    response: fromPromise<CollectionResponse<any>>(
      axios.get(props.endpoint).then((response) => response.data['hydra:member'])
    ),
  }));

  // @ts-ignore
  const options = (state.response.value ?? []).map((item: any) => {
    const value = props.removeIri ? item.id : `${props.endpoint.replace(/\/$/, '')}/${item.id}`;

    return {
      value: value,
      label: item[props.labelKey],
    };
  });

  return (
    <Field name={props.fieldName} groupClassName={css({ marginBottom: 0 })}>
      {({ input }) => {
        return (
          <Select
            className={css({ minWidth: 250 })}
            // @ts-ignore
            value={options.filter((option) => option.value === input.value)}
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
});
