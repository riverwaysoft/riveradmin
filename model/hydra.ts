import { TimeStamps } from './timestamps';

export type CollectionResponse<Resource extends HasId> = {
  'hydra:member': Resource[];
  'hydra:totalItems': number;
  'hydra:view': { '@id': string; 'hydra:last': string };
  'hydra:search': { 'hydra:mapping': any[] };
  'hydra:last': string;
};

export type HydraMember = {
  '@id': string;
  id: string;
};

export type Dto<T> = Omit<T, keyof TimeStamps | keyof HydraMember> & {
  '@id'?: string;
  id: string;
} & Partial<TimeStamps>;

export type HasId = {
  id: string;
};
