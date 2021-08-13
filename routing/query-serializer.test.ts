import { QuerySerializer } from './query-serializer';

describe('QuerySerializer', () => {
  const querySerializer = new QuerySerializer();

  it('should parse url from window object', () => {
    const search = '?id=1&date[from]=2015&date[to]=2019&status[0]=a&status[1]=b';
    const windowMock = { location: { search } } as any;

    const filters = querySerializer.parseQueryParams(windowMock);
    expect(filters).toMatchSnapshot();
  });

  it('should support url encoded values', () => {
    const search = '?id=1&date%5Bfrom%5D=2015&date%5Bto%5D=2019&status%5B0%5D=a&status%5B1%5D=b';
    const windowMock = { location: { search } } as any;

    const filters = querySerializer.parseQueryParams(windowMock);
    expect(filters).toMatchSnapshot();
  });

  it('should parse empty query param list', () => {
    const windowMock = { location: { search: '' } } as any;

    const filters = querySerializer.parseQueryParams(windowMock);
    expect(filters).toMatchSnapshot();
  });

  it('should parse query prefix only', () => {
    const windowMock = { location: { search: '?' } } as any;

    const filters = querySerializer.parseQueryParams(windowMock);
    expect(filters).toMatchSnapshot();
  });

  it('should stringify complex filter', () => {
    const filter = {
      test: 1,
      range: {
        min: 10,
        max: 20,
      },
      'partner.companyName': 'someName',
    };

    const serialized = querySerializer.stringifyParams(filter);
    expect(serialized).toMatchSnapshot();

    const windowMock = { location: { search: serialized } } as any;
    expect(querySerializer.parseQueryParams(windowMock)).toMatchSnapshot();
  });
});
