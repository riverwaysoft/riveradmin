import { QuerySerializer } from '../routing/query-serializer';
import { DataProvider } from './data-provider';
import { CollectionResponse, HasId } from '../model/hydra';
import { AxiosInstance } from 'axios';

export type DataProviderUrl =
  | string
  | {
      fetchList: string;
      delete: (id: string) => string;
    };

export class HydraDataProvider<T extends HasId> implements DataProvider<T> {
  constructor(
    private axios: AxiosInstance,
    private querySerializer: QuerySerializer,
    private url: DataProviderUrl
  ) {}

  fetchList(filters?: object): Promise<CollectionResponse<T>> {
    const isFilterEmpty = !filters || Object.keys(filters).length === 0;

    const listEndpoint = typeof this.url === 'string' ? this.url : this.url.fetchList;

    return this.axios
      .get(
        isFilterEmpty
          ? listEndpoint
          : `${listEndpoint}?${this.querySerializer.stringifyParams(filters!)}`
      )
      .then((response) => response.data);
  }

  removeOne(id: string): Promise<unknown> {
    const deleteEndpoint = typeof this.url === 'string' ? this.url : this.url.delete(id);

    return this.axios.delete(deleteEndpoint).then((response) => response.data);
  }
}
