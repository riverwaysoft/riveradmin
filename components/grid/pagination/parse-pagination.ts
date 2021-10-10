import { CollectionResponse, HasId } from '../../../model/hydra';

type PaginationResult = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
};

export const parsePagination = <T extends HasId>(
  value: CollectionResponse<T> | undefined
): PaginationResult | null => {
  if (value && value['hydra:view']) {
    const viewMeta = value['hydra:view'];
    const totalItems = value['hydra:totalItems'];
    const matchPage = new RegExp(/page=([0-9]+)/);
    const currentMatch = viewMeta['@id'].match(matchPage);
    if (!currentMatch) {
      return null;
    }
    const currentPage = currentMatch[1];
    const pagesMatcher = viewMeta['hydra:last'].match(matchPage);

    if (pagesMatcher && pagesMatcher[1] && parseInt(pagesMatcher[1]) > 1) {
      return {
        currentPage: parseInt(currentPage),
        totalPages: parseInt(pagesMatcher[1]),
        totalItems,
      };
    }
  }

  return null;
};
