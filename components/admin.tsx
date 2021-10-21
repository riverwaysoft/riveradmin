import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { RiverAdminRootStore } from '../store/river-admin-root-store';
import { StoreContext as RiverAdminRootStoreContext } from '../store/use-riveradmin-store';
import { Layout } from './layout';

export type MenuRoutes = {
  [key in string]: {
    title: string;
    menu?: boolean;
    query?: object;
  } & Pick<RouteProps, 'component' | 'exact'>;
};

type Props = {
  routes: MenuRoutes;
  riverAdminRootStore: RiverAdminRootStore<any>;
};

export const Admin = observer((props: Props) => {
  const { routes, riverAdminRootStore } = props;

  return (
    <RiverAdminRootStoreContext.Provider value={riverAdminRootStore}>
      <Layout routes={routes} />
    </RiverAdminRootStoreContext.Provider>
  );
});
