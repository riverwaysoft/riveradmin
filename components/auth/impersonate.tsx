import React, { useEffect } from 'react';
import { assert } from 'ts-essentials';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';

export const Impersonate = () => {
  const { impersonateService } = useRiverAdminStore();
  assert(impersonateService, 'Impersonate configuration is required in order to use impersonation');

  useEffect(() => {
    impersonateService.impersonate();
  }, [impersonateService]);

  return <p>Impersonating...</p>;
};
