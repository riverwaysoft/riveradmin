import { CollectionResponse, HydraMember } from '../model/hydra';

export type DataProvider<Entity extends HydraMember> = {
  fetchList(filters?: object): Promise<CollectionResponse<Entity>>;
  removeOne(id: string): Promise<unknown>;
};
