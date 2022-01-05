import { FORM_ERROR } from 'final-form';
import { makeAutoObservable } from 'mobx';
import { RouterStore } from '@superwf/mobx-react-router';
import { handleFormSubmit } from '../../final-form/handle-form-submit';
import { AdminApiClient } from '../../api/admin-api-client';
import { AdminAuthStore } from '../../store/admin-auth-store';

export type AdminLoginForm = {
  telephone: string;
  password: string;
};

export class AdminLoginStore {
  form?: AdminLoginForm;

  constructor(
    private apiClient: AdminApiClient,
    private authStore: AdminAuthStore,
    private routerStore: RouterStore
  ) {
    makeAutoObservable(this);
  }

  submitLoginForm = async (form: AdminLoginForm) => {
    const result = await handleFormSubmit(this.apiClient.loginAdmin(form.telephone, form.password));
    if (result.errors) {
      return result.errors;
    }

    try {
      await this.authStore.authenticate(result.response!.token);
      setTimeout(() => this.routerStore.push('/'), 500);
    } catch (e: any) {
      return { [FORM_ERROR]: e.message };
    }
  };
}
