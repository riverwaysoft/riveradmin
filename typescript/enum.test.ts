import { enumValues } from './enum';

describe('enumValues', () => {
  it('can extract enum numeric values', () => {
    enum HotLineModule {
      ScheduleMeeting,
      ProductCatalog,
      StaffMember,
      Places,
      Faq,
    }

    expect(enumValues(HotLineModule)).toStrictEqual([0, 1, 2, 3, 4]);
  });
});
