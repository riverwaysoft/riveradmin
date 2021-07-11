import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router';
import { createBrowserHistory } from 'history';
import { AdminApiClient } from '../api/admin-api-client';
import { ImpersonateService } from '../jwt/impersonate-service';
import { QuerySerializer } from '../routing/query-serializer';
import { AdminAuthStore } from './admin-auth-store';
import { Notificator } from '../notificator/notificator';
import { AdminLoginStore } from '../components/auth/admin-login-store';
import { ListStoreFactory } from '../factory/list-store-factory';
import { ReactIntlFactory, SupportedLanguage } from '../factory/react-intl-factory';
import { ReactIntlTranslator } from '../intl/react-intl-translator';
import { LocalTokenStorage } from '../jwt/local-token-storage';
import { FormStoreFactory } from '../factory/form-store-factory';

export abstract class RiverAdminRootStore<T extends AdminApiClient> {
  protected notificator = new Notificator();
  protected tokenStorage = new LocalTokenStorage(this.config.localStorageKey);
  apiClient = this.createApiClient();
  routerStore = new RouterStore();
  authStore = new AdminAuthStore(this.tokenStorage, this.routerStore);
  reactIntlFactory = new ReactIntlFactory();
  reactIntl = this.reactIntlFactory.create(this.config.locale);
  translator = new ReactIntlTranslator(this.reactIntl);
  querySerializer = new QuerySerializer();
  impersonateService?: ImpersonateService;
  listStoreFactory = new ListStoreFactory(
    this.routerStore,
    this.notificator,
    this.translator,
    this.querySerializer
  );
  formStoreFactory = new FormStoreFactory(this.notificator, this.routerStore, this.translator);

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

    if (config.impersonate) {
      this.impersonateService = new ImpersonateService(
        this.querySerializer,
        this.tokenStorage,
        config.impersonate.impersonateApiCall,
        config.impersonate.host
      );
    }
  }

  abstract createApiClient(): T;

  createAdminLoginStore = () => {
    return new AdminLoginStore(this.apiClient, this.authStore, this.routerStore);
  };
}
