import { makeAutoObservable } from 'mobx';
import { RouterStore } from '@superwf/mobx-react-router';
import { parseJwt } from '../jwt/jwt';
import { TokenStorage } from '../jwt/token-storage';

export type AuthUser = {
  id: string;
  roles: string[];
  [key: string]: unknown
};

export class AdminAuthStore {
  user?: AuthUser;
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
    this.user = parseJwt<AuthUser>(parsedJwt);
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
