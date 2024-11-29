import { api, IApiPaginated, IPageParams } from '@api';

import { IPostListApi } from './types';

async function getList(
  params?: IPageParams,
): Promise<IApiPaginated<IPostListApi>> {
  // add delay de 2s
  await new Promise(resolve => setTimeout(resolve, 2000));

  const response = await api.get<IApiPaginated<IPostListApi>>('/user/post', {
    params,
  });

  return response.data;
}

export const postApi = { getList };
