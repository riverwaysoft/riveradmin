import { assert, IsExact } from 'conditional-type-checks';
import { FormErrors } from './form-errors';

describe('FormErrors type', () => {
  it('should convert form to form errors', () => {
    type UserForm = { id: number; age: number };

    assert<IsExact<FormErrors<UserForm>, { id?: string; age?: string }>>(true);
  });
});
