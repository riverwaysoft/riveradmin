import {CollectionResponse, HasId} from '../model/hydra';
import {DataProvider} from '../data-provider/data-provider';

export type GeneratedEndpoints<T extends HasId> = {
  fetchList: (filters: any | null) => Promise<CollectionResponse<T>>;
  delete: (id: string) => Promise<any>;
};

export class GeneratedDataProvider<T extends HasId> implements DataProvider<T> {
  constructor(private config: GeneratedEndpoints<T>) {
  }

  fetchList(filters: object | undefined): Promise<CollectionResponse<T>> {
    return this.config.fetchList(filters);
  }

  removeOne(id: string): Promise<unknown> {
    return this.config.delete(id);
  }
}
