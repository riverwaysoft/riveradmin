import { createContext, useContext } from 'react';
import { assert } from 'ts-essentials';
import { RiverAdminStores } from './river-admin-stores';

export const StoreContext = createContext<RiverAdminStores | null>(null);

export const useRiverAdminStore = () => {
  const context = useContext(StoreContext);
  assert(context, 'You have forgotten to create a Context Provider for RiverAdminRootStore');
  return context;
};
