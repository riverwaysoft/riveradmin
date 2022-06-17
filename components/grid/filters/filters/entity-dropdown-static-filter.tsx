import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import { css } from '@emotion/css';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { fromPromise } from 'mobx-utils';
import axios from 'axios';
import { CollectionResponse } from '../../../../model/hydra';
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

export const EntityDropdownStaticFilter = observer((props: Props) => {
  const state = useLocalObservable(() => ({
    response: fromPromise<CollectionResponse<any>>(
      axios.get(props.endpoint).then((response) => response.data['hydra:member'])
    ),
  }));
  const iriPrefix = props.iriPrefix ? `${trimRight(props.iriPrefix, '/')}/` : '';

  // @ts-ignore
  const options = (state.response.value ?? []).map((item: any) => {
    return {
      value: `${iriPrefix}${item.id}`,
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
