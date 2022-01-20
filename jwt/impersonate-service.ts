import { assert } from 'ts-essentials';
import { HasId } from '../model/hydra';
import { QuerySerializer } from '../routing/query-serializer';
import { TokenStorage } from './token-storage';

export const openImpersonateFromAdmin = async (
  getJwt: () => Promise<{ token: string }>,
  host: string
) => {
  const { token } = await getJwt();
  assert(token, 'JWT token not found');
  const newWindow = window.open(`${host}/_impersonate?jwt=${token}`, '_blank');
  newWindow?.focus();
};

export const impersonate = (querySerializer: QuerySerializer, tokenStorage: TokenStorage) => {
  const params = querySerializer.parseQueryParams();
  assert(typeof params['jwt'] === 'string', 'Invalid JWT impersonate key');
  tokenStorage.removeToken();
  tokenStorage.setToken(params['jwt']);
  window.location.pathname = '/';
};

