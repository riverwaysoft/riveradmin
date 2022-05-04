import { Notificator } from '../notificator/notificator';
import { action, makeAutoObservable } from 'mobx';
import { handleFormSubmit } from '../final-form/handle-form-submit';
import { v4 } from 'uuid';
import { assert } from 'ts-essentials';
import { Translator } from '../intl/translator';
import { History } from 'history';

type HasId = { id: string };

export type CrudApi<Model> = {
  fetchOne: (modelId: string) => Promise<Model>;
  create?: (body: object) => Promise<Model>;
  update: (modelId: string, body: object) => Promise<Model>;
};

export type FormStoreOptions = { fetchAfterSubmit: boolean };

export class FormStore<Model extends HasId, Form extends object = {}> {
  model?: Model;
  isModelLoading = false;

  constructor(
    private crudApi: CrudApi<Model>,
    private notificator: Notificator,
    private history: History,
    private translator: Translator,
    private options: FormStoreOptions = { fetchAfterSubmit: false }
  ) {
    makeAutoObservable(this);
  }

  async loadModel(id: string) {
    if (id === 'new') {
    } else {
      this.isModelLoading = true;
      return this.crudApi
        .fetchOne(id)
        .then(
          action((model) => {
            this.model = model;
          })
        )
        .finally(action(() => (this.isModelLoading = false)));
    }
  }

  submitForm = async (form: Partial<Form>) => {
    if (this.model) {
      const result = await handleFormSubmit(this.crudApi.update(this.model.id, form));
      if (result.errors) {
        return result.errors;
      }
      this.notificator.success(this.translator.translate('riveradmin.data-saved'));
      if (this.options.fetchAfterSubmit) {
        this.loadModel(this.model.id);
      }
    } else {
      if (!this.crudApi.create) {
        throw new Error(
          "Operation create not implemented in API. You've forgotten to add specify endpoint"
        );
      }
      const modelCreateInput = { id: v4(), ...form };
      const result = await handleFormSubmit(this.crudApi.create(modelCreateInput));
      if (result.errors) {
        return result.errors;
      }
      const pathWithoutModelIdRegex = /\/([^/]+)\//;
      const regexResult = pathWithoutModelIdRegex.exec(this.history.location.pathname);
      assert(regexResult);
      const pathWithoutModelId = regexResult[1];
      this.history.push(`/${pathWithoutModelId}/${modelCreateInput.id}`);
      this.notificator.success(this.translator.translate('riveradmin.data-saved'));
    }
  };
}
