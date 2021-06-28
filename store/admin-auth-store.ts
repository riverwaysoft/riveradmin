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
  user?: AdminUser;
  isAppLoaded = false;

  constructor(private tokenStorage: TokenStorage, private routerStore: RouterStore) {
    makeAutoObservable(this);
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
    runInAction(() => {
      this.user = { id: jwtUser.id, '@type': 'AdminUser' };
      this.isAppLoaded = true;
    });
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
