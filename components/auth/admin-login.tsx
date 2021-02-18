import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { AdminLoginForm } from './admin-login-store';
import { Field, Form as FinalForm } from 'react-final-form';
import { Form, Card, Button } from 'react-bootstrap';
import { InputAdapter } from '../ui/input-adapter';
import { ValidationMessage } from '../ui/validation-message';

export const AdminLogin = observer(() => {
  const { createAdminLoginStore, config } = useRiverAdminStore();
  const [adminLoginStore] = useState(createAdminLoginStore);

  return (
    <div className={'d-flex justify-content-center'} style={{ paddingTop: '25vh' }}>
      <Card className={'p-4'} style={{ width: '300px' }}>
        <div className={'d-flex justify-content-center'}>
          <h3>{config.appTitle}</h3>
        </div>
        <FinalForm<AdminLoginForm>
          onSubmit={adminLoginStore.submitLoginForm}
          initialValues={adminLoginStore.form}
        >
          {({ handleSubmit, submitting, submitError }) => (
            <Form onSubmit={handleSubmit} className={'mt-3'}>
              <Field name={'telephone'} label={'Login'} component={InputAdapter} />
              <Field
                name={'password'}
                type={'password'}
                label={'Password'}
                component={InputAdapter}
              />
              <ValidationMessage message={submitError} />
              <Button className={'mt-2'} block type="primary" disabled={submitting}>
                Login
              </Button>
            </Form>
          )}
        </FinalForm>
      </Card>
    </div>
  );
});
