import { useEffect } from 'react';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';

export const AdminLogout = () => {
  const { authStore } = useRiverAdminStore();

  useEffect(() => {
    authStore.logout();
  }, [authStore]);

  return null;
};
