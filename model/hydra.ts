import { TimeStamps } from './timestamps';

export type CollectionResponse<Resource extends HydraMember> = {
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
