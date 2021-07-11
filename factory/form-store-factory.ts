import { Notificator } from '../notificator/notificator';
import { RouterStore } from '@superwf/mobx-react-router';
import { Translator } from '../intl/translator';
import { CrudApi, FormStore } from '../store/form-store';
import { HasId } from '../model/hydra';

export class FormStoreFactory {
  constructor(
    private notificator: Notificator,
    private routerStore: RouterStore,
    private translator: Translator
  ) {}

  create<Model extends HasId, Form extends object = {}>(crudApi: CrudApi<Model>) {
    return new FormStore(crudApi, this.notificator, this.routerStore, this.translator);
  }
}
