import React, { useEffect } from 'react';

export const Impersonate = (props: { impersonate: () => void }) => {
  const { impersonate } = props;

  useEffect(() => {
    impersonate();
  }, [impersonate]);

  return <p>Impersonating...</p>;
};
