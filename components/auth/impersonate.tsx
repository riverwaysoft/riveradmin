import React, { useEffect } from 'react';
import { ImpersonateService } from '../../jwt/impersonate-service';

type Props = {
  impersonateService: ImpersonateService;
};

export const Impersonate = (props: Props) => {
  const { impersonateService } = props;

  useEffect(() => {
    impersonateService.impersonate();
  }, [impersonateService]);

  return <p>Impersonating...</p>;
};
