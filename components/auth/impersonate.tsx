import React, { useEffect } from 'react';

export const Impersonate = (props: { impersonate: () => void }) => {
  useEffect(() => {
    props.impersonate();
  }, [props.impersonate]);

  return <p>Impersonating...</p>;
};
