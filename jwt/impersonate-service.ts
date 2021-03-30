import { assert } from 'ts-essentials';
import { HydraMember } from '../model/hydra';

type ImpersonateApiCall = (entityId: string) => Promise<{ token: string }>;

export class ImpersonateService {
  constructor(private apiCall: ImpersonateApiCall, private host: string) {}

  async impersonate(entity: HydraMember) {
    const { token } = await this.apiCall(entity.id);
    assert(token, 'JWT token not found');
    const newWindow = window.open(`${this.host}/_impersonate?jwt=${token}`, '_blank');
    newWindow?.focus();
  }
}
