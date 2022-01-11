import { AdminGrid } from './admin-grid';

type TestUser = {
  id: string;
  name: string;
};

describe('AdminGrid', () => {
  it('Allows to pass different data types to render() function except object', () => {
    const a = (
      <AdminGrid<TestUser>
        listStore={{} as any}
        columns={[
          { label: 'String', render: () => '' },
          { label: 'String', render: () => 1 },
          { label: 'String', render: () => undefined },
          { label: 'String', render: () => <div>Test</div> },
          {
            label: 'String',
            // @ts-expect-error
            render: () => ({ object: 'Should be TS error to avoid React error "not valid child"' }),
          },
        ]}
      />
    );
  });
});
