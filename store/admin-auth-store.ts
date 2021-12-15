import { makeAutoObservable } from 'mobx';
import { RouterStore } from '@superwf/mobx-react-router';
import { parseJwt } from '../jwt/jwt';
import { TokenStorage } from '../jwt/token-storage';
import { AdminUser } from '../model/admin-user';

type JwtUser = {
  id: string;
  roles: string[];
};

export class AdminAuthStore {
  user?: AdminUser;
  isAppLoaded = false;

  constructor(private tokenStorage: TokenStorage, private routerStore: RouterStore) {
    makeAutoObservable(this);
  }

  authenticate(token?: string) {
    const parsedJwt = token || this.tokenStorage.getToken();
    if (!parsedJwt) {
      this.isAppLoaded = true;
      return;
    }
    this.tokenStorage.setToken(parsedJwt);
    const jwtUser = parseJwt<JwtUser>(parsedJwt);
    this.user = { id: jwtUser.id, roles: jwtUser.roles };
    this.isAppLoaded = true;
  }

  get isAuthenticated() {
    return !!this.user;
  }

  logout() {
    this.user = undefined;
    this.tokenStorage.removeToken();
    this.routerStore.push('/');
  }
}
