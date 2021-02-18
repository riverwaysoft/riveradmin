import { createContext, useContext } from 'react';
import { assert } from 'ts-essentials';
import { RiverAdminRootStore } from './river-admin-root-store';

export const StoreContext = createContext<RiverAdminRootStore<any> | null>(null);

export const useRiverAdminStore = () => {
  const context = useContext(StoreContext);
  assert(context, 'You have forgotten to create a Context Provider for RiverAdminRootStore');
  return context;
};
