import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { RawIntlProvider } from 'react-intl';
import { NavLink, Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { assert } from 'ts-essentials';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { MenuRoutes } from '../admin';
import { AdminAuthenticatedRoute } from '../auth/admin-authenticated-route';
import { AdminLogin } from '../auth/admin-login';
import { AdminLogout } from '../auth/admin-logout';
import { css, cx } from '@emotion/css';
import { NavLogout } from './nav-logout';

export const Layout = observer((props: { routes: MenuRoutes; navSlot?: JSX.Element }) => {
  const { history, authStore, reactIntl, config, querySerializer } = useRiverAdminStore();
  const { routes, navSlot } = props;
  assert(routes.length > 0, 'No routes specified');

  useEffect(() => {
    authStore.authenticate();
  }, [authStore]);

  if (!authStore.isAppLoaded) {
    return null;
  }

  const allowedMenuRoutes = (routes).filter((route) => {
    if (typeof route.menu === 'function') {
      return route.menu(authStore);
    }
    return !!route.menu;
  });

  const redirectTo =
    allowedMenuRoutes.length && authStore.isAuthenticated ? allowedMenuRoutes[0].url : '/login';

  return (
    <RawIntlProvider value={reactIntl}>
      <Router history={history}>
        <Switch>
          <Route path={'/login'} component={AdminLogin} />
          <Route path={'/logout'} component={AdminLogout} />
          <Route
            path={'/'}
            render={() => {
              return (
                <div className={css({ display: 'flex', flexDirection: 'column' })}>
                  <nav
                    className={cx(
                      'navbar navbar-light',
                      css({ backgroundColor: 'var(--light)', marginBottom: 24 })
                    )}
                  >
                    <span className="navbar-brand">{config.appTitle}</span>
                    {navSlot}
                    <NavLogout />
                  </nav>
                  <div className={css({ display: 'flex', padding: 8, gap: 16 })}>
                    <div className={css({ width: '15%' })}>
                      <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                          {allowedMenuRoutes.map(({ title, query, url }) => (
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
                          ))}
                        </li>
                      </ul>
                    </div>
                    <div className={css({ width: '100%' })}>
                      <Switch>
                        {(routes).map(({ component, exact, isPublic, url }) => {
                          const Tag = isPublic ? Route : AdminAuthenticatedRoute;
                          return <Tag exact={exact} key={url} path={url} component={component} />;
                        })}
                        {redirectTo && (
                          <Route path={'*'} component={() => <Redirect to={redirectTo} />} />
                        )}
                      </Switch>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          {redirectTo && <Route path={'*'} component={() => <Redirect to={redirectTo} />} />}
        </Switch>
        <ToastContainer />
      </Router>
    </RawIntlProvider>
  );
});
