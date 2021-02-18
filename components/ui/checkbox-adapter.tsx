import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form } from 'react-bootstrap';

type Props<T> = FieldRenderProps<T, HTMLInputElement>;

export const CheckboxAdapter = <T extends string | number>(props: Props<T>) => {
  return (
    <Form.Group>
      <Form.Check {...props.input} type="checkbox" label={props.label} />
    </Form.Group>
  );
};
