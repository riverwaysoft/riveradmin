import { AdminAuthStore } from '../../store/admin-auth-store';
import { assert } from 'ts-essentials';
import { isNestedMenuRoute } from './is-nested-menu-route';
import { MenuRoutes } from './types';

export const getFirstAllowedRouteToRedirect = (
  authStore: AdminAuthStore,
  allowedRoutes: MenuRoutes
) => {
  if (!allowedRoutes.length || !authStore.isAuthenticated) {
    return '/login';
  }

  const firstAllowedRoute = allowedRoutes[0];

  if (isNestedMenuRoute(firstAllowedRoute)) {
    assert(firstAllowedRoute.children.length, 'Nested route should have at least one children');
    return firstAllowedRoute.children[0].url;
  }

  return firstAllowedRoute.url;
};
