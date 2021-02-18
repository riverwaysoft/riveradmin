import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import { Form } from 'react-bootstrap';
import { hasError, showError } from '../../final-form/handle-form-submit';

type Props<T> = FieldRenderProps<T, HTMLInputElement>;

export const InputAdapter = <T extends string | number>(props: Props<T>) => {
  const { input } = props;
  return (
    <Form.Group className={props.groupClassName}>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Form.Control
        {...input}
        isInvalid={hasError(props, props.skipTouched)}
        as={props.as || undefined}
        disabled={props.disabled}
        placeholder={props.placeholder}
        className={props.className}
        id={props.id}
        style={props.style}
        rows={props.rows}
        autoFocus={props.autoFocus}
      />
      <Form.Control.Feedback type="invalid">{showError(props)}</Form.Control.Feedback>
    </Form.Group>
  );
};
