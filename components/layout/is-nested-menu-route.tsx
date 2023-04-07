import { MenuRoute, NestedMenuRoute } from './types';

export const isNestedMenuRoute = (route: NestedMenuRoute | MenuRoute): route is NestedMenuRoute => {
  return 'children' in route;
};
