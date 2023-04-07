import { observer } from 'mobx-react-lite';
import React from 'react';
import { RiverAdminStores } from '../store/river-admin-stores';
import { StoreContext as RiverAdminStoresContext } from '../store/use-riveradmin-store';
import { Layout } from './layout/layout';
import { MenuRoutes } from './layout/types';

type Props = {
  routes: MenuRoutes;
  riverAdminStores: RiverAdminStores;
  navSlot?: JSX.Element;
};

export const Admin = observer((props: Props) => {
  const { routes, riverAdminStores, navSlot } = props;

  return (
    <RiverAdminStoresContext.Provider value={riverAdminStores}>
      <Layout routes={routes} navSlot={navSlot} />
    </RiverAdminStoresContext.Provider>
  );
});
