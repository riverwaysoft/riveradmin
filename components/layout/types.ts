import { AdminAuthStore } from '../../store/admin-auth-store';
import { RouteProps } from 'react-router-dom';

export type MenuRoute = {
  url: string;
  // The title of the route. It will be displayed as tab title in browser + as <h1> header on a page
  title: string;
  // Should this route be added to the menu list?
  menu?: boolean | ((adminAuthStore: AdminAuthStore) => boolean);
  // Pass query params for the route
  // For example you may want to pass default sorting params for a page
  // Usage: ['/users', { query: { createdAt: 'desc' } }] will be transformed to /users?createdAt=desc
  query?: object;
  // A component to render for this route. It is the same as React Router's 'component' prop for a <Route/>
  component?: RouteProps['component'];
  // It is the same as React Router's 'exact' prop for a <Route/>
  exact?: RouteProps['exact'];
  // If this route available without authentication? Useful for public pages, impersonation
  isPublic?: boolean;
};

export type NestedMenuRoute = {
  title: string;
  // Should this route be added to the menu list?
  menu?: boolean | ((adminAuthStore: AdminAuthStore) => boolean);
  children: MenuRoute[];
};

export type MenuRoutes = Array<NestedMenuRoute | MenuRoute>;
