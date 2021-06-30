import { HasId } from '../model/hydra';
import { RouterStore } from '@superwf/mobx-react-router';
import { Translator } from '../intl/translator';
import { QuerySerializer } from '../routing/query-serializer';
import { CrudStore } from '../store/crud-store';
import { HydraDataProvider } from '../data-provider/hydra-data-provider';
import axios from 'axios';
import { Notificator } from '../notificator/notificator';

export class CrudStoreFactory {
  constructor(
    public routerStore: RouterStore,
    public notificator: Notificator,
    public translator: Translator,
    public querySerializer: QuerySerializer
  ) {}

  create<Entity extends HasId>(listEndpoint: string, deleteEndpoint?: string) {
    return new CrudStore(
      new HydraDataProvider<Entity>(axios, this.querySerializer, listEndpoint, deleteEndpoint),
      this.routerStore,
      this.notificator,
      this.translator,
      this.querySerializer
    );
  }
}
