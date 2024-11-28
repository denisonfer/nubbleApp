import { api, IApiPaginated } from '@api';

import { IPostListApi } from './types';

async function getList(): Promise<IApiPaginated<IPostListApi>> {
  const response = await api.get<IApiPaginated<IPostListApi>>('/user/post');

  return response.data;
}

export const postApi = { getList };
