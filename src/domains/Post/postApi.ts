import { api } from '@api';
import { IApiPaginated } from 'src/api/types';

import { IPostListApi } from './types';

async function getList(): Promise<IApiPaginated<IPostListApi>> {
  const response = await api.get<IApiPaginated<IPostListApi>>('/user/post');

  return response.data;
}

export const postApi = { getList };
