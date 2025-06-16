import { apiAdapter } from '@api';
import { TPagination } from '@types';
import { userAdapter } from './userAdapter';
import { userApi } from './userApi';
import { TUser } from './userTypes';

async function getById(userId: number): Promise<TUser> {
  const response = await userApi.getById(userId);

  return userAdapter.toUser(response);
}

async function searchUser(search: string): Promise<TPagination<TUser>> {
  const response = await userApi.getList(search);

  return apiAdapter.toPageModel(response, userAdapter.toUser);
}

export const userServices = { getById, searchUser };
