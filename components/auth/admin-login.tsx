import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { AdminLoginForm } from './admin-login-store';
import { Field, Form as FinalForm } from 'react-final-form';
import { Button, Card, Form } from 'react-bootstrap';
import { InputAdapter } from '../ui/input-adapter';
import { ValidationMessage } from '../ui/validation-message';
import { css } from '@emotion/css';

export const AdminLogin = observer(() => {
  const { createAdminLoginStore, config } = useRiverAdminStore();
  const [adminLoginStore] = useState(createAdminLoginStore);

  return (
    <div className={css({ display: 'flex', justifyContent: 'center', paddingTop: '25vh' })}>
      <Card className={css({ padding: 24, width: 300 })}>
        <div className={css({ display: 'flex', justifyContent: 'center' })}>
          <h3>{config.appTitle}</h3>
        </div>
        <FinalForm<AdminLoginForm>
          onSubmit={adminLoginStore.submitLoginForm}
          initialValues={adminLoginStore.form}
        >
          {({ handleSubmit, submitting, submitError }) => (
            <Form onSubmit={handleSubmit} className={css({ marginTop: 24 })}>
              <Field
                name={'telephone'}
                autoComplete={'username'}
                label={'Login'}
                component={InputAdapter}
              />
              <Field
                name={'password'}
                type={'password'}
                autoComplete={'current-password'}
                label={'Password'}
                component={InputAdapter}
              />
              <ValidationMessage message={submitError} />
              <Button className={css({ marginTop: 16 })} block type="primary" disabled={submitting}>
                Login
              </Button>
            </Form>
          )}
        </FinalForm>
      </Card>
    </div>
  );
});
