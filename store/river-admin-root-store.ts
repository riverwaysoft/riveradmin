import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router';
import { createBrowserHistory } from 'history';
import { AdminApiClient } from '../api/admin-api-client';
import { QuerySerializer } from '../routing/query-serializer';
import { AdminAuthStore } from './admin-auth-store';
import { Notificator } from '../notificator/notificator';
import { AdminLoginStore } from '../components/auth/admin-login-store';
import { ListStoreFactory } from '../factory/list-store-factory';
import { ReactIntlFactory, SupportedLanguage, Translations } from '../factory/react-intl-factory';
import { ReactIntlTranslator } from '../intl/react-intl-translator';
import { LocalTokenStorage } from '../jwt/local-token-storage';
import { FormStoreFactory } from '../factory/form-store-factory';
import { TokenStorage } from '../jwt/token-storage';
import { Translator } from '../intl/translator';

export abstract class RiverAdminRootStore<T extends AdminApiClient> {
  protected notificator = new Notificator();
  protected tokenStorage: TokenStorage;
  apiClient = this.createApiClient();
  routerStore = new RouterStore();
  authStore: AdminAuthStore;
  translator: Translator;
  querySerializer = new QuerySerializer();
  listStoreFactory: ListStoreFactory;
  formStoreFactory: FormStoreFactory;

  constructor(
    public config: {
      isRowClickableEnabled?: boolean;
      locale: SupportedLanguage;
      translations?: Translations;
      localStorageKey: string;
      appTitle: string;
    }
  ) {
    const history = createBrowserHistory();
    syncHistoryWithStore(history, this.routerStore);
    this.tokenStorage = new LocalTokenStorage(this.config.localStorageKey);
    this.authStore = new AdminAuthStore(this.tokenStorage, this.routerStore);
    this.translator = new ReactIntlTranslator(
      new ReactIntlFactory().create(this.config.locale, this.config.translations)
    );
    this.listStoreFactory = new ListStoreFactory(
      this.routerStore,
      this.notificator,
      this.translator,
      this.querySerializer
    );
    this.formStoreFactory = new FormStoreFactory(
      this.notificator,
      this.routerStore,
      this.translator
    );
  }

  abstract createApiClient(): T;

  createAdminLoginStore = () => {
    return new AdminLoginStore(this.apiClient, this.authStore, this.routerStore);
  };
}
