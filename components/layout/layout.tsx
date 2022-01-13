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
  const { routerStore, authStore, reactIntl, config, querySerializer } = useRiverAdminStore();
  const { routes, navSlot } = props;
  assert(Object.keys(routes).length > 0, 'No routes specified');

  useEffect(() => {
    authStore.authenticate();
  }, [authStore]);

  if (!authStore.isAppLoaded) {
    return null;
  }

  return (
    <RawIntlProvider value={reactIntl}>
      <Router history={routerStore.history}>
        <Switch>
          <Route path={'/login'} component={AdminLogin} />
          <Route path={'/logout'} component={AdminLogout} />
          <Route
            path={'/'}
            render={() => (
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
                        {Object.entries(routes)
                          .filter(([_, route]) => {
                            if (typeof route.menu === 'function') {
                              return route.menu(authStore);
                            }
                            return !!route.menu;
                          })
                          .map(([path, { title, query }]) => (
                            <NavLink
                              key={path}
                              className={'nav-link'}
                              to={{
                                pathname: path,
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
                      {Object.entries(routes).map(([path, { component, exact }]) => (
                        <AdminAuthenticatedRoute
                          exact={exact}
                          key={path}
                          path={path}
                          component={component}
                        />
                      ))}
                      <Route
                        path={'*'}
                        component={() => <Redirect to={Object.keys(routes)[0]} />}
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            )}
          />
          <Route path={'*'} component={() => <Redirect to={Object.keys(routes)[0]} />} />
        </Switch>
        <ToastContainer />
      </Router>
    </RawIntlProvider>
  );
});
