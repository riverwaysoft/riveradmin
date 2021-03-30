import React, { useEffect, useState } from 'react';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';

export const Impersonate = () => {
  const { createImpersonateService } = useRiverAdminStore();
  const [impersonateService] = useState(createImpersonateService());

  useEffect(() => {
    impersonateService.impersonate();
  }, [impersonateService]);

  return <p>Impersonating...</p>;
};
