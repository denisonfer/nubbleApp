import { userAdapter } from './userAdapter';
import { userApi } from './userApi';
import { TUser } from './userTypes';

async function getById(userId: number): Promise<TUser> {
  const response = await userApi.getById(userId);

  return userAdapter.toUser(response);
}

export const userServices = { getById };
