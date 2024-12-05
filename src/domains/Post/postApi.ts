import { api, IApiPaginated, IPageParams } from '@api';

import { IPostListApi } from './types';

async function getList(
  params?: IPageParams,
): Promise<IApiPaginated<IPostListApi>> {
  const response = await api.get<IApiPaginated<IPostListApi>>('/user/post', {
    params,
  });

  return response;
}

export const postApi = { getList };
