import { Observer, observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { RawIntlProvider } from 'react-intl';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { assert } from 'ts-essentials';
import { useRiverAdminStore } from '../../store/use-riveradmin-store';
import { AdminAuthenticatedRoute } from '../auth/admin-authenticated-route';
import { AdminLogin } from '../auth/admin-login';
import { AdminLogout } from '../auth/admin-logout';
import { css, cx } from '@emotion/css';
import { NavLogout } from './nav-logout';
import { SidebarStore } from './sidebar-store';
import { reset } from '../../css/reset';
import { ChevronIcon } from '../../../trainer-app/pages/shared/components/icons/сhevron-icon';
import { Accordion } from './accordion';
import SimpleBar from 'simplebar-react';
import { MenuRouteView } from './menu-route-view';
import { getFirstAllowedRouteToRedirect } from './get-first-allowed-route-to-redirect';
import { onlyAllowedMenuRoutesFilter } from './only-allowed-menu-routes-filter';
import { isNestedMenuRoute } from './is-nested-menu-route';
import { MenuRoutes } from './types';

export const Layout = observer((props: { routes: MenuRoutes; navSlot?: JSX.Element }) => {
  const { history, authStore, reactIntl, config } = useRiverAdminStore();
  const { routes, navSlot } = props;
  const [sidebarStore] = useState(() => new SidebarStore());
  assert(routes.length > 0, 'No routes specified');

  useEffect(() => {
    authStore.authenticate();
  }, [authStore]);

  if (!authStore.isAppLoaded) {
    return null;
  }

  const allowedMenuRoutes = routes.filter(onlyAllowedMenuRoutesFilter(authStore));

  const redirectTo = getFirstAllowedRouteToRedirect(authStore, allowedMenuRoutes);

  return (
    <RawIntlProvider value={reactIntl}>
      <Router history={history}>
        <Switch>
          <Route path={'/login'} component={AdminLogin} />
          <Route path={'/logout'} component={AdminLogout} />
          <Route
            path={'/'}
            render={() => (
              <Observer>
                {() => {
                  return (
                    <div className={css({ display: 'flex', flexDirection: 'column' })}>
                      <nav
                        className={cx(
                          'navbar navbar-light',
                          css({ backgroundColor: 'var(--light)' })
                        )}
                      >
                        <span className="navbar-brand">{config.appTitle}</span>
                        {navSlot}
                        <NavLogout />
                      </nav>
                      <div className={css({ display: 'flex', padding: 8, gap: 16 })}>
                        <div className={css({ width: 300 })}>
                          <SimpleBar
                            className={cx(
                              'nav nav-pills flex-column',
                              css({
                                height: 'calc(100vh - 70px)',
                                position: 'fixed',
                                overflowY: 'auto',
                              })
                            )}
                          >
                            {allowedMenuRoutes.map((route, i) => {
                              const isExpanded = sidebarStore.expandedMenuItems.includes(i);
                              if (isNestedMenuRoute(route)) {
                                return (
                                  <>
                                    <li
                                      className={cx(
                                        'nav-item nav-link',
                                        css({
                                          display: 'flex !important',
                                          cursor: 'pointer',
                                          justifyContent: 'space-between',
                                          alignItems: 'center',
                                        })
                                      )}
                                      onClick={() => {
                                        sidebarStore.toggleExpandedMenuItem(i);
                                      }}
                                    >
                                      <span>{route.title}</span>
                                      <ChevronIcon direction={isExpanded ? 'up' : 'down'} />
                                    </li>
                                    <Accordion isVisible={isExpanded}>
                                      <ul className={cx(reset.ul)}>
                                        {route.children
                                          .filter(onlyAllowedMenuRoutesFilter(authStore))
                                          .map((child) => {
                                            return (
                                              <li className="nav-item pl-3">
                                                <MenuRouteView menuRoute={child} />
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </Accordion>
                                  </>
                                );
                              }

                              return (
                                <li className="nav-item">
                                  <MenuRouteView menuRoute={route} />
                                </li>
                              );
                            })}
                          </SimpleBar>
                        </div>
                        <div className={css({ width: '100%' })}>
                          <Switch>
                            {routes
                              .flatMap((route) =>
                                isNestedMenuRoute(route) ? route.children : [route]
                              )
                              .map(({ component, exact, isPublic, url }) => {
                                const Tag = isPublic ? Route : AdminAuthenticatedRoute;
                                return (
                                  <Tag exact={exact} key={url} path={url} component={component} />
                                );
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
              </Observer>
            )}
          />
          {redirectTo && <Route path={'*'} component={() => <Redirect to={redirectTo} />} />}
        </Switch>
        <ToastContainer />
      </Router>
    </RawIntlProvider>
  );
});
