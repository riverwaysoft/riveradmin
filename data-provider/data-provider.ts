import { CollectionResponse, HasId } from '../model/hydra';

export type DataProvider<Entity extends HasId> = {
  fetchList(filters?: object): Promise<CollectionResponse<Entity>>;
  removeOne(id: string): Promise<unknown>;
};
