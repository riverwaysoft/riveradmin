import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { MenuRoute } from './types';

export const MenuRouteView = ({ menuRoute }: { menuRoute: MenuRoute }) => {
  const { querySerializer } = useRiverAdminStore();

  const { title, query, url } = menuRoute;
  return (
    <NavLink
      key={url}
      className={'nav-link'}
      to={{
        pathname: url,
        search: query ? querySerializer.stringifyParams(query) : undefined,
      }}
      activeClassName="active"
    >
      {title}
    </NavLink>
  );
};
