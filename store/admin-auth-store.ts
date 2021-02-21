import { makeAutoObservable, runInAction } from 'mobx';
import { RouterStore } from '@superwf/mobx-react-router';
import { parseJwt } from '../jwt/jwt';
import { TokenStorage } from '../jwt/token-storage';
import { AdminUser } from '../model/admin-user';

type JwtUser = {
  id: string;
  roles: Array<'ROLE_SUPER_ADMIN'>;
};

export class AdminAuthStore {
  user: AdminUser | null = null;
  isAppLoaded = false;

  constructor(public tokenStorage: TokenStorage, public routerStore: RouterStore) {
    makeAutoObservable(this, {
      tokenStorage: false,
      routerStore: false,
    });
  }

  async authenticate(token?: string) {
    const parsedJwt = token || this.tokenStorage.getToken();
    if (!parsedJwt) {
      runInAction(() => {
        this.isAppLoaded = true;
      });
      return;
    }
    this.tokenStorage.setToken(parsedJwt);
    const jwtUser = parseJwt<JwtUser>(parsedJwt);

    if (!jwtUser.roles.includes('ROLE_SUPER_ADMIN')) {
      throw new Error('Only admins allowed to authenticate');
    }
    runInAction(() => {
      this.user = { id: jwtUser.id, '@type': 'AdminUser' };
      this.isAppLoaded = true;
    });
  }

  get isAuthenticated() {
    return !!this.user;
  }

  logout() {
    this.user = null;
    this.tokenStorage.removeToken();
    this.routerStore.push('/');
  }
}
