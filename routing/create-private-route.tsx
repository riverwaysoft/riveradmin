import { AdminAuthStore } from '../store/admin-auth-store';
import { ComponentType } from 'react';
import { onlyConditionHoc } from './only-condition-hoc';
import { MenuRoute } from '../components/admin';

// Private route does the following things:
// - It redirects to "Not allowed" page if callback returns false
// - It hides menu option automatically if callback returns false
export const createPrivateRoute = (props: {
  url: MenuRoute['url'];
  callback: (adminAuthStore: AdminAuthStore) => boolean;
  title: MenuRoute['title'];
  component: ComponentType<{}>;
  exact?: MenuRoute['exact'];
  query?: MenuRoute['query'];
  // Useful if you want to force hide this route from menu. e.g. for form pages like '/user/:id' or '/product/:id'
  menu?: false;
}): MenuRoute => {
  const { title, component, callback, exact, query, url } = props;
  const menu = props.menu === false ? false : callback;

  return {
    url,
    title,
    component: onlyConditionHoc(component, callback),
    exact,
    query,
    menu,
  };
};
