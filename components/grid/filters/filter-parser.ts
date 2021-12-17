import { assert } from 'ts-essentials';
import { CollectionResponse } from '../../../model/hydra';

export type GridFilter =
  | { type: 'fullText'; property?: string }
  | { type: 'date'; property?: string }
  | { type: 'bool'; property?: string }
  | { type: 'input'; property?: string }
  | { type: 'enum'; property?: string; enum?: { [key in string]: number } }
  | {
      type: 'entity_dropdown';
      property: string;
      labelKey: string;
      endpoint: string;
      async: boolean;
    }
  | { type: 'range'; property?: string };

const NESTED_NOTATION_REPLACE = '__';

// https://stackoverflow.com/a/56539950
// Fix Final form issue - prevent replace dot to object
export const wrapNestedNotation = (filterProperty: string): string => {
  return filterProperty.replace(/\./g, NESTED_NOTATION_REPLACE);
};

export const unwrapNestedNotation = (filterProperty: string): string => {
  return filterProperty.replace(new RegExp(NESTED_NOTATION_REPLACE, 'g'), '.');
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
    if (item.variable.endsWith('[gte]')) {
      gridFilters.push({ type: 'range', property: wrapNestedNotation(item.property) });
    }

    if (item.property?.startsWith('riveradmin_input')) {
      gridFilters.push({ type: 'input', property: wrapNestedNotation(item.variable) });
    }

    if (item.property?.startsWith('riveradmin_enum')) {
      const enumJson = item.property.replace('riveradmin_enum:', '');
      const enumParsed = JSON.parse(enumJson);
      gridFilters.push({
        type: 'enum',
        enum: enumParsed,
        property: wrapNestedNotation(item.variable),
      });
    }

    if (item.property?.startsWith('riveradmin_entity_dropdown')) {
      const dropdownConfigJson = item.property.replace('riveradmin_entity_dropdown:', '');
      const dropdownConfigParsed = JSON.parse(dropdownConfigJson);
      assert(dropdownConfigParsed.labelKey);
      assert(dropdownConfigParsed.endpoint);
      gridFilters.push({
        type: 'entity_dropdown',
        labelKey: dropdownConfigParsed.labelKey,
        endpoint: dropdownConfigParsed.endpoint,
        async: !!dropdownConfigParsed.async,
        property: wrapNestedNotation(item.variable),
      });
    }

    if (item.property?.startsWith('riveradmin_bool')) {
      const property = item.property.match(/\[(.+)]/)[1];
      if (property) {
        gridFilters.push({ type: 'bool', property: wrapNestedNotation(property) });
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
