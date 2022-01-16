import { FORM_ERROR } from 'final-form';
import { makeAutoObservable } from 'mobx';
import { handleFormSubmit } from '../../final-form/handle-form-submit';
import { DefaultAdminApiClient } from '../../api/default-admin-api-client';
import { AdminAuthStore } from '../../store/admin-auth-store';
import { History } from 'history';

export type AdminLoginForm = {
  telephone: string;
  password: string;
};

export class AdminLoginStore {
  form?: AdminLoginForm;

  constructor(
    private apiClient: DefaultAdminApiClient,
    private authStore: AdminAuthStore,
    private history: History
  ) {
    makeAutoObservable(this);
  }

  submitLoginForm = async (form: AdminLoginForm) => {
    const result = await handleFormSubmit(this.apiClient.loginAdmin(form.telephone, form.password));
    if (result.errors) {
      return result.errors;
    }

    try {
      if (!result.response?.token) {
        return { [FORM_ERROR]: 'No token found in API response. Please contact support' };
      }
      await this.authStore.authenticate(result.response.token);
      setTimeout(() => this.history.push('/'), 500);
    } catch (e) {
      // @ts-ignore
      return { [FORM_ERROR]: e.message };
    }
  };
}
