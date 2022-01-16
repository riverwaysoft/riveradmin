import { Notificator } from '../notificator/notificator';
import { Translator } from '../intl/translator';
import { CrudApi, FormStore } from '../store/form-store';
import { HasId } from '../model/hydra';
import { History } from 'history';

export class FormStoreFactory {
  constructor(
    private notificator: Notificator,
    private history: History,
    private translator: Translator
  ) {}

  create<Model extends HasId, Form extends object = {}>(crudApi: CrudApi<Model>) {
    return new FormStore<Model, Form>(crudApi, this.notificator, this.history, this.translator);
  }
}
