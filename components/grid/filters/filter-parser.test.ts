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

  it('parses custom filters', () => {
    const response = {
      '@id': '/api/admin_notifications',
      '@type': 'hydra:Collection',
      'hydra:member': [
        {
          '@type': 'admin_notification',
          '@id': '/api/admin_notifications/43d702db-ff0c-4493-8889-1a0e7f244d0d',
          id: '43d702db-ff0c-4493-8889-1a0e7f244d0d',
          text: 'Number: 972795158570 not exists or not properly configured',
          createdAt: '2021-08-10T17:43:35+00:00',
          severity: 3,
          context: [],
          ownerName: 'Test owner',
        },
        {
          '@type': 'admin_notification',
          '@id': '/api/admin_notifications/74b859bd-70d8-438f-a664-c218a970e17a',
          id: '74b859bd-70d8-438f-a664-c218a970e17a',
          text: 'Number: 972795126038 not exists or not properly configured',
          createdAt: '2021-08-10T17:42:39+00:00',
          severity: 3,
          context: [],
          ownerName: null,
        },
      ],
      'hydra:totalItems': 2,
      'hydra:search': {
        '@type': 'hydra:IriTemplate',
        'hydra:template':
          '/api/admin_notifications{?text,text[],ownerName,ownerName[],createdAt[before],createdAt[strictly_before],createdAt[after],createdAt[strictly_after],severity,severity[]}',
        'hydra:variableRepresentation': 'BasicRepresentation',
        'hydra:mapping': [
          {
            '@type': 'IriTemplateMapping',
            variable: 'text',
            property: 'riveradmin_input:text',
            required: false,
          },
          { '@type': 'IriTemplateMapping', variable: 'text[]', property: 'text', required: false },
          {
            '@type': 'IriTemplateMapping',
            variable: 'ownerName',
            property: 'ownerName',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'ownerName[]',
            property: 'ownerName',
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
            variable: 'partner.companyName',
            property: 'riveradmin_input',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'severity',
            property:
              'riveradmin_enum:{\u0022INFO\u0022:1,\u0022NOTICE\u0022:2,\u0022WARNING\u0022:3,\u0022ERROR\u0022:4}',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            property:
              'riveradmin_entity_dropdown:{"endpoint":"\\/api\\/trainers","labelKey":"username"}',
            required: false,
            variable: 'progress.trainer',
          },
          {
            '@type': 'IriTemplateMapping',
            variable: 'severity[]',
            property: 'severity',
            required: false,
          },
          {
            '@type': 'IriTemplateMapping',
            property: 'rating.rating',
            required: false,
            variable: 'rating.rating[lte]',
          },
          {
            '@type': 'IriTemplateMapping',
            property: 'rating.rating',
            required: false,
            variable: 'rating.rating[gte]',
          },
        ],
      },
    } as any;

    const result = parseHydraFilters(response);
    expect(result).toMatchSnapshot();
  });
});
