import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form } from 'react-bootstrap';
import { css } from '@emotion/css/macro';

type Props<T> = FieldRenderProps<T, HTMLInputElement>;

export const CheckboxAdapter = <T extends string | number>(props: Props<T>) => {
  return (
    <Form.Group>
      <label
        className={css`
          padding: 0;
          display: flex;
        `}
      >
        <Form.Check {...props.input} type="checkbox" />
        {props.label}
      </label>
    </Form.Group>
  );
};
