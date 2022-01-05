import React from 'react';
import { css } from '@emotion/css';
import { useTranslate } from '../../store/use-translate';

export const AdminGridNoResults = () => {
  const t = useTranslate();

  return (
    <div className={css({ textAlign: 'center', width: '100%', marginTop: 2 })}>
      <p>{t('No items matched your search')}</p>
    </div>
  );
};
