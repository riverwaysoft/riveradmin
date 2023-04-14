// @ts-nocheck
import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form } from 'react-bootstrap';
import { css } from '@emotion/css';

type Props<T> = FieldRenderProps<T, HTMLInputElement>;

export const CheckboxAdapter = <T extends string | number>(props: Props<T>) => {
  return (
    <Form.Group className={props.groupClassName}>
      <label className={css({ display: 'flex', padding: 0 })}>
        <Form.Check {...props.input} type="checkbox" />
        {props.label}
      </label>
    </Form.Group>
  );
};
