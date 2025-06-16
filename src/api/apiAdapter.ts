import { TMetaData, TPagination } from '@types';

import { IApiPaginated, IMetaApi } from './types';

function toMetaData(meta: IMetaApi): TMetaData {
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

function toPageModel<TApiType, TModelType>(
  apiData: IApiPaginated<TApiType>,
  adapterToModel: (apiData: TApiType) => TModelType,
): TPagination<TModelType> {
  return {
    data: apiData.data.map(adapterToModel),
    meta: toMetaData(apiData.meta),
  };
}
export const apiAdapter = { toMetaData, toPageModel };
