import { createBrowserHistory, History } from 'history';
import { DefaultAdminApiClient } from '../api/default-admin-api-client';
import { QuerySerializer } from '../routing/query-serializer';
import { AdminAuthStore } from './admin-auth-store';
import { Notificator } from '../notificator/notificator';
import { ListStoreFactory } from '../factory/list-store-factory';
import { ReactIntlFactory, SupportedLanguage, Translations } from '../factory/react-intl-factory';
import { ReactIntlTranslator } from '../intl/react-intl-translator';
import { LocalTokenStorage } from '../jwt/local-token-storage';
import { FormStoreFactory } from '../factory/form-store-factory';
import { TokenStorage } from '../jwt/token-storage';
import { AdminLoginStore } from '../components/auth/admin-login-store';

export const createRiverAdminStores = <AdminApiClient extends DefaultAdminApiClient>(
  config: {
    isRowClickableEnabled?: boolean;
    locale: SupportedLanguage;
    translations?: Translations;
    localStorageKey: string;
    appTitle: string;
  },
  props: {
    createApiClient: (
      router: History,
      notificator: Notificator,
      tokenStorage: TokenStorage
    ) => AdminApiClient;
  }
) => {
  const notificator = new Notificator();
  const tokenStorage = new LocalTokenStorage(config.localStorageKey);
  const history = createBrowserHistory();
  const apiClient = props.createApiClient(history, notificator, tokenStorage);
  const authStore = new AdminAuthStore(tokenStorage, history);
  const reactIntl = new ReactIntlFactory().create(config.locale, config.translations);
  const translator = new ReactIntlTranslator(reactIntl);
  const querySerializer = new QuerySerializer();
  const createAdminLoginStore = () => new AdminLoginStore(apiClient, authStore, history);
  const listStoreFactory = new ListStoreFactory(history, notificator, translator, querySerializer);
  const formStoreFactory = new FormStoreFactory(notificator, history, translator);

  return {
    config,
    notificator,
    tokenStorage,
    reactIntl,
    apiClient,
    history,
    authStore,
    translator,
    querySerializer,
    createAdminLoginStore,
    listStoreFactory,
    formStoreFactory,
  };
};

export type RiverAdminStores = ReturnType<typeof createRiverAdminStores>;
