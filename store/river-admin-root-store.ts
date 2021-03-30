import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router';
import { createBrowserHistory } from 'history';
import { assert } from 'ts-essentials';
import { AdminApiClient } from '../api/admin-api-client';
import { ImpersonateService } from '../jwt/impersonate-service';
import { QuerySerializer } from '../routing/query-serializer';
import { AdminAuthStore } from './admin-auth-store';
import { Notificator } from '../notificator/notificator';
import { AdminLoginStore } from '../components/auth/admin-login-store';
import { CrudStoreFactory } from '../factory/crud-store-factory';
import { ReactIntlFactory, SupportedLanguage } from '../factory/react-intl-factory';
import { ReactIntlTranslator } from '../intl/react-intl-translator';
import { LocalTokenStorage } from '../jwt/local-token-storage';

export abstract class RiverAdminRootStore<T extends AdminApiClient> {
  protected notificator = new Notificator();
  protected tokenStorage = new LocalTokenStorage(this.config.localStorageKey);
  routerStore = new RouterStore();
  apiClient = this.createApiClient();
  authStore = new AdminAuthStore(this.tokenStorage, this.routerStore);
  reactIntlFactory = new ReactIntlFactory();
  reactIntl = this.reactIntlFactory.create(this.config.locale);
  translator = new ReactIntlTranslator(this.reactIntl);
  querySerializer = new QuerySerializer();
  crudStoreFactory = new CrudStoreFactory(
    this.routerStore,
    this.notificator,
    this.translator,
    this.querySerializer
  );

  constructor(
    public config: {
      locale: SupportedLanguage;
      localStorageKey: string;
      appTitle: string;
      impersonate?: {
        host: string;
        impersonateApiCall: (entityId: string) => Promise<{ token: string }>;
      };
    }
  ) {
    const history = createBrowserHistory();
    syncHistoryWithStore(history, this.routerStore);
  }

  abstract createApiClient(): T;

  createAdminLoginStore = () => {
    return new AdminLoginStore(this.apiClient, this.authStore, this.routerStore);
  };

  createImpersonateService = () => {
    assert(this.config.impersonate, 'Impersonate configuration is required in order to use impersonation');
    return new ImpersonateService(
      this.querySerializer,
      this.tokenStorage,
      this.config.impersonate.impersonateApiCall,
      this.config.impersonate.host
    );
  };
}
