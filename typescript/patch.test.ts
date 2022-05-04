import { assert, IsExact } from 'conditional-type-checks';
import { Patch } from './patch';

describe('Path type', () => {
  it('should allow to patch a specific property of a type', () => {
    type User = { id: string; age: number };
    assert<IsExact<Patch<User, { age: string }>, { id: string; age: string }>>(true);
  });
});
