import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import React from 'react';
import { useTranslate } from '../../store/use-translate';

export const NavLogout = () => {
  const t = useTranslate();

  return (
    <Link to={'/logout'} className={css({ display: 'flex', alignItems: 'center', gap: 8 })}>
      <span>{t('riveradmin.logout')}</span>
      <i className={'mdi mdi-logout mdi-24px'} />
    </Link>
  );
};
