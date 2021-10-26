import React from 'react';
import { css } from '@emotion/css/macro';

export const AdminGridNoResults = () => {
  return (
    <div className={css({ textAlign: 'center', width: '100%', marginTop: 2 })}>
      <p>No items matched your search</p>
    </div>
  );
};
