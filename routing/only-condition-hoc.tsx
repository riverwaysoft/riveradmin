import React from 'react';
import { observer } from 'mobx-react-lite';
import { AdminAuthStore } from '../store/admin-auth-store';
import {useRiverAdminStore} from "../store/use-riveradmin-store";

export const onlyConditionHoc = (
  WrappedComponent: React.ComponentType<{}>,
  callback: (adminAuthStore: AdminAuthStore) => boolean
) => {
  return observer(() => {
    const { authStore } = useRiverAdminStore();
    const isAllowed = callback(authStore);
    if (isAllowed) {
      return <WrappedComponent />;
    }
    return <h1>Not allowed</h1>;
  });
};
