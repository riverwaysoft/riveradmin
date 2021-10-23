import React from 'react';
import { css } from '@emotion/css/macro';

export const AdminGridNoResults = () => {
  return (
    <div className={styles.wrapper}>
      <p>No items matched your search</p>
    </div>
  );
};

const styles = {
  wrapper: css({ textAlign: 'center', width: '100%', marginTop: 2 }),
};
