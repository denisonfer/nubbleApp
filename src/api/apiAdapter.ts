import { TMetaData } from '@types';

import { IMetaApi } from './types';

function adaptToMetaData(meta: IMetaApi): TMetaData {
  return {
    total: meta.total,
    perPage: meta.per_page,
    firstPage: meta.first_page,
    currentPage: meta.current_page,
    lastPage: meta.last_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

export const apiAdapter = { adaptToMetaData };
