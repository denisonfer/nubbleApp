import { api } from '@api';

import { IUserApi } from './userTypes';

const ENDPOINT = '/users';

async function getById(userId: number): Promise<IUserApi> {
  const response = await api.get<IUserApi>(`${ENDPOINT}/${userId}`);

  return response;
}

export const userApi = { getById };
