import { IUserApi, TUser } from './userTypes';

function toUser(userApi: IUserApi): TUser {
  return {
    id: userApi.id,
    firstName: userApi.first_name,
    lastName: userApi.last_name,
    userName: userApi.username,
    email: userApi.email,
    profileUrl: userApi.profile_url,
    isOnline: userApi.is_online,
    fullName: `${userApi.first_name} ${userApi.last_name}`,
  };
}

export const userAdapter = { toUser };
