import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { FormattedMessage, RawIntlProvider } from 'react-intl';
import { Link, NavLink, Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { assert } from 'ts-essentials';
import { useRiverAdminStore } from '../store/use-riveradmin-store';
import { MenuRoutes } from './admin';
import { AdminAuthenticatedRoute } from './auth/admin-authenticated-route';
import { AdminLogin } from './auth/admin-login';
import { AdminLogout } from './auth/admin-logout';
import { css, cx } from '@emotion/css/macro';

type Props = {
  routes: MenuRoutes;
};

export const Layout = observer((props: Props) => {
  const { routerStore, authStore, reactIntl, config, querySerializer } = useRiverAdminStore();
  const { routes } = props;
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
                  <Link
                    to={'/logout'}
                    className={css({ display: 'flex', alignItems: 'center', gap: 8 })}
                  >
                    <span>
                      <FormattedMessage id={'riveradmin.logout'} />
                    </span>
                    <i className={'mdi mdi-logout mdi-24px'} />
                  </Link>
                </nav>
                <div className={css({ display: 'flex', padding: 8, gap: 16 })}>
                  <div className={css({ width: '15%' })}>
                    <ul className="nav nav-pills flex-column">
                      <li className="nav-item">
                        {Object.entries(routes)
                          .filter(([_, route]) => !!route.menu)
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
