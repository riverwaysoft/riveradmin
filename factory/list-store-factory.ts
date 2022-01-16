import { HasId } from '../model/hydra';
import { Translator } from '../intl/translator';
import { QuerySerializer } from '../routing/query-serializer';
import { ListStore } from '../store/list-store';
import { DataProviderUrl, HydraDataProvider } from '../data-provider/hydra-data-provider';
import axios from 'axios';
import { Notificator } from '../notificator/notificator';
import { History } from 'history';

export class ListStoreFactory {
  constructor(
    private history: History,
    private notificator: Notificator,
    private translator: Translator,
    private querySerializer: QuerySerializer
  ) {}

  create<Entity extends HasId>(url: DataProviderUrl) {
    return new ListStore(
      new HydraDataProvider<Entity>(axios, this.querySerializer, url),
      this.history,
      this.notificator,
      this.translator,
      this.querySerializer
    );
  }
}
