import { AdminAuthStore } from '../../store/admin-auth-store';

import { MenuRoute, NestedMenuRoute } from './types';

export const onlyAllowedMenuRoutesFilter =
  (authStore: AdminAuthStore) => (route: MenuRoute | NestedMenuRoute) => {
    if (typeof route.menu === 'function') {
      return route.menu(authStore);
    }
    return !!route.menu;
  };
