import { assert, IsExact } from 'conditional-type-checks';
import { UnwrapArray } from './unwrap-array';

describe('UnwrapArray type', () => {
  it('should unwrap generic from an array', () => {
    type Users = Array<{ id: string; age: number }>;
    assert<IsExact<UnwrapArray<Users>, { id: string; age: number }>>(true);
  });
});
