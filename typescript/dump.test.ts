import { assert, IsExact } from 'conditional-type-checks';
import { Dump } from './dump';

describe('Dump type', () => {
  it('doesnt modify initial type', () => {
    type User = { id: string; age: number };
    assert<IsExact<Dump<User>, User>>(true);
  });
});
