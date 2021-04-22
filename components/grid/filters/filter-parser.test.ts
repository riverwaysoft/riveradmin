import { parseHydraFilters } from './filter-parser';

describe('filter-parser', () => {
  it('parses createdAt & fullText', () => {
    const response = {
      'hydra:search': {
        '@type': 'hydra:IriTemplate',
        'hydra:mapping': [
          {
            '@type': 'IriTemplateMapping',
            variable: 'fullText',
            property: null,
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'createdAt[before]',
            property: 'createdAt',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'createdAt[strictly_before]',
            property: 'createdAt',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'createdAt[after]',
            property: 'createdAt',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'createdAt[strictly_after]',
            property: 'createdAt',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            property: 'isApproved',
            required: false,
            variable: 'isApproved',
          },
        ],
      },
    } as any;

    const result = parseHydraFilters(response);
    expect(result).toMatchSnapshot();
  });

  it('parses fullText only', () => {
    const response = {
      'hydra:search': {
        '@type': 'hydra:IriTemplate',
        'hydra:mapping': [
          {
            '@type': 'IriTemplateMapping',
            variable: 'fullText',
            property: null,
            required: false,
          },
        ],
      },
    } as any;

    const result = parseHydraFilters(response);
    expect(result).toMatchSnapshot();
  });
});
