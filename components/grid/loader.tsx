import React from 'react';
import { css } from '@emotion/css';

export const Loader = () => {
  return (
    <div
      className={css({
        width: '100%',
        height: '50vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <i className={'mdi mdi-spin mdi-loading'} />
    </div>
  );
};
