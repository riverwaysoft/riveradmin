import { AdminAuthStore } from '../store/admin-auth-store';
import { ComponentType } from 'react';
import { onlyConditionHoc } from './only-condition-hoc';

// Private route does 2 things:
// - It redirects to "Not allowed" page if callback returns false
// - It hides menu option automatically if callback returns false
export const createPrivateRoute = (props: {
  callback: (adminAuthStore: AdminAuthStore) => boolean;
  title: string;
  component: ComponentType<{}>;
  exact?: boolean;
  // Useful if you want to force hide this route from menu. e.g for form pages like '/user/:id' or '/todos/:id'
  menu?: false;
}) => {
  const { title, component, callback, exact } = props;
  const menu = props.menu === false ? false : callback;

  return {
    title: title,
    component: onlyConditionHoc(component, callback),
    exact: exact,
    menu,
  };
};
