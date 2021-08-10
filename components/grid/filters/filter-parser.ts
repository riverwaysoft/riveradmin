import { CollectionResponse } from '../../../model/hydra';

export type GridFilterType = 'fullText' | 'date' | 'bool' | 'input' | 'enum';

export type GridFilter = {
  type: GridFilterType;
  property?: string;
  enum?: { [key in string]: number };
};

export const parseHydraFilters = (response: CollectionResponse<any>): GridFilter[] => {
  if (!response['hydra:search']) {
    return [];
  }

  const mapping = response['hydra:search']['hydra:mapping'];
  const gridFilters: GridFilter[] = [];

  mapping.forEach((item) => {
    if (item.variable === 'fullText') {
      gridFilters.push({ type: 'fullText' });
    }
    if (item.variable.endsWith('[before]')) {
      gridFilters.push({ type: 'date', property: item.property });
    }

    if (item.property?.startsWith('riveradmin_input')) {
      gridFilters.push({ type: 'input', property: item.variable })
    }

    if (item.property?.startsWith('riveradmin_enum')) {
      const enumJson = item.property.replace('riveradmin_enum:', '');
      const enumParsed = JSON.parse(enumJson);
      gridFilters.push({ type: 'enum', enum: enumParsed, property: item.variable })
    }

    if (item.property?.startsWith('riveradmin_bool')) {
      const property = item.property.match(/\[(.+)]/)[1];
      if (property) {
        gridFilters.push({ type: 'bool', property: property });
      } else {
        console.error('Riveradmin: riveradmin_bool filter is incorrect');
      }
    }
    if (item.property && !item.property.includes('[') && item.property === item.variable) {
      const isSearchFilter = !!mapping.find((nestedItem) =>
        (nestedItem.variable || '').startsWith(`${item.property}[`)
      );
      if (!isSearchFilter) {
        gridFilters.push({ type: 'bool', property: item.property });
      }
    }
  });

  return gridFilters;
};
