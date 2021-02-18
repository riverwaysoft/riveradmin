import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';

type Props = Pick<RouteProps, 'path' | 'component' | 'exact'>;

export const AdminAuthenticatedRoute = observer((props: Props) => {
  const { authStore } = useRiverAdminStore();
  if (!authStore.isAuthenticated) {
    return <Redirect to={'/login'} />;
  }
  return <Route {...props} />;
});
