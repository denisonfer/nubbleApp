import { IUserApi, TAuth } from '@domains';
import { userAdapter } from '../../domains/User/userAdapter';

const mateusUserApi: IUserApi = {
  id: 1,
  first_name: 'Mateus',
  last_name: 'Silva',
  username: 'mateus.silva',
  email: 'mateus.silva@email.com',
  profile_url: 'https://github.com/mateus.silva.png',
  is_online: true,
  full_name: 'Mateus Silva',
};

export const mateusAuthCredentials: TAuth = {
  auth: {
    token: '123456',
    refreshToken: '123456',
    expiresAt: '2021-01-01T00:00:00.000Z',
  },
  user: userAdapter.toUser(mateusUserApi),
};

export const mockUtils = {
  mateusAuthCredentials,
  mateusUserApi,
};
