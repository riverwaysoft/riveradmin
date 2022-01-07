import { RouterStore, syncHistoryWithStore } from '@superwf/mobx-react-router';
import { createBrowserHistory } from 'history';
import { AdminApiClient } from '../api/admin-api-client';
import { QuerySerializer } from '../routing/query-serializer';
import {
  AdminAuthStore,
  AdminAuthStoreUser,
} from './admin-auth-store';
import { Notificator } from '../notificator/notificator';
import { ListStoreFactory } from '../factory/list-store-factory';
import { ReactIntlFactory, SupportedLanguage, Translations } from '../factory/react-intl-factory';
import { ReactIntlTranslator } from '../intl/react-intl-translator';
import { LocalTokenStorage } from '../jwt/local-token-storage';
import { FormStoreFactory } from '../factory/form-store-factory';
import { TokenStorage } from '../jwt/token-storage';
import { AdminLoginStore } from '../components/auth/admin-login-store';
export const createRiverAdminStores = <AdminUser extends AdminAuthStoreUser=AdminAuthStoreUser, T extends AdminApiClient=AdminApiClient>(
  config: {
    isRowClickableEnabled?: boolean;
    locale: SupportedLanguage;
    translations?: Translations;
    localStorageKey: string;
    appTitle: string;
  },
  props: {
    createApiClient: (
      router: RouterStore,
      notificator: Notificator,
      tokenStorage: TokenStorage
    ) => T;
  }
) => {
  const notificator = new Notificator();
  const tokenStorage = new LocalTokenStorage(config.localStorageKey);
  const routerStore = new RouterStore();
  const history = createBrowserHistory();
  syncHistoryWithStore(history, routerStore);
  const apiClient = props.createApiClient(routerStore, notificator, tokenStorage);
  const authStore = new AdminAuthStore<AdminUser>(tokenStorage, routerStore);
  const reactIntl = new ReactIntlFactory().create(config.locale, config.translations);
  const translator = new ReactIntlTranslator(reactIntl);
  const querySerializer = new QuerySerializer();
  const createAdminLoginStore = () => new AdminLoginStore(apiClient, authStore, routerStore);
  const listStoreFactory = new ListStoreFactory(
    routerStore,
    notificator,
    translator,
    querySerializer
  );
  const formStoreFactory = new FormStoreFactory(notificator, routerStore, translator);

  return {
    config,
    notificator,
    tokenStorage,
    reactIntl,
    apiClient,
    routerStore,
    authStore,
    translator,
    querySerializer,
    createAdminLoginStore,
    listStoreFactory,
    formStoreFactory,
  };
};

export type RiverAdminStores = ReturnType<typeof createRiverAdminStores>;
