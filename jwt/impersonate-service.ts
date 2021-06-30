import { assert } from 'ts-essentials';
import { HasId } from '../model/hydra';
import { QuerySerializer } from '../routing/query-serializer';
import { TokenStorage } from './token-storage';

type ImpersonateApiCall = (entityId: string) => Promise<{ token: string }>;

export class ImpersonateService {
  constructor(
    private querySerializer: QuerySerializer,
    private tokenStorage: TokenStorage,
    private apiCall: ImpersonateApiCall,
    private host: string
  ) {}

  async openImpersonatePage(entity: HasId) {
    const { token } = await this.apiCall(entity.id);
    assert(token, 'JWT token not found');
    const newWindow = window.open(`${this.host}/_impersonate?jwt=${token}`, '_blank');
    newWindow?.focus();
  }

  impersonate() {
    const params = this.querySerializer.parseQueryParams();
    this.tokenStorage.removeToken();
    assert(typeof params['jwt'] === 'string', 'Invalid JWT impersonate key');
    this.tokenStorage.setToken(params['jwt']);
    window.location.pathname = '/';
  }
}
