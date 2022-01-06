import React from 'react';
import { observer } from 'mobx-react-lite';
import { useAdminStore } from '../../admin/stores/use-admin-store';
import { AdminAuthStore } from '../store/admin-auth-store';

export const onlyConditionHoc = (
  WrappedComponent: React.ComponentType<{}>,
  callback: (adminAuthStore: AdminAuthStore) => boolean
) => {
  return observer(() => {
    const { authStore } = useAdminStore();
    const isAllowed = callback(authStore);
    if (isAllowed) {
      return <WrappedComponent />;
    }
    return <h1>Not allowed</h1>;
  });
};
