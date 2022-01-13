import { observer } from 'mobx-react-lite';
import React from 'react';
import { RouteProps } from 'react-router-dom';
import { RiverAdminStores } from '../store/river-admin-stores';
import { StoreContext as RiverAdminStoresContext } from '../store/use-riveradmin-store';
import { Layout } from './layout/layout';
import { AdminAuthStore } from '../store/admin-auth-store';

// This is admin route configuration
export type MenuRoutes = {
  // The path of the route
  [key in string]: {
    // The title of the route. It will be displayed as tab title in browser + as <h1> header on a page
    title: string;
    // Should this route be added to the menu list?
    menu?: boolean | ((adminAuthStore: AdminAuthStore) => boolean);
    // Pass query params for the route
    // For example you may want to pass default sorting params for a page
    // Usage: ['/users', { query: { createdAt: 'desc' } }] will be transformed to /users?createdAt=desc
    query?: object;
    // A component to render for this route. It is the same as React Router's 'component' prop for a <Route/>
    component?: RouteProps['component'];
    // It is the same as React Router's 'exact' prop for a <Route/>
    exact?: RouteProps['exact'];
  };
};

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
