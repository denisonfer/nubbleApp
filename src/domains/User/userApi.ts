import { api, IApiPaginated } from '@api';

import { IUserApi } from './userTypes';

const PATH = '/users';

async function getById(userId: number): Promise<IUserApi> {
  const response = await api.get<IUserApi>(`${PATH}/${userId}`);

  return response.data;
}

async function getList(search: string): Promise<IApiPaginated<IUserApi>> {
  const response = await api.get<IApiPaginated<IUserApi>>(`${PATH}`, {
    params: {
      search,
    },
  });

  return response.data;
}

export const userApi = { getById, getList };
