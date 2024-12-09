import { api } from '@api';

import { IAuthApi, IAuthSignUpDTOApi, IIsValueAvailableApi } from './authTypes';

async function signIn(email: string, password: string): Promise<IAuthApi> {
  const response = await api.post<IAuthApi>('/auth/login', { email, password });

  return response.data;
}

async function signUp(data: IAuthSignUpDTOApi): Promise<void> {
  const response = await api.post('/auth/register', data);

  return response.data;
}

async function logout(): Promise<string> {
  const response = await api.get<{ message: string }>('/auth/profile/logout');

  return response.data.message;
}

async function forgotPassword(email: string): Promise<string> {
  const response = await api.post<{ message: string }>(
    '/auth/forgot-password',
    {
      email,
    },
  );

  return response.data.message;
}

async function isUserNameAvailable(
  username: string,
): Promise<IIsValueAvailableApi> {
  const response = await api.get<IIsValueAvailableApi>(
    '/auth/validate-username',
    {
      params: {
        username,
      },
    },
  );

  return response.data;
}

async function isEmailAvailable(email: string): Promise<IIsValueAvailableApi> {
  const response = await api.get<IIsValueAvailableApi>('/auth/validate-email', {
    params: {
      email,
    },
  });

  return response.data;
}

export const authApi = {
  signIn,
  signUp,
  forgotPassword,
  logout,
  isUserNameAvailable,
  isEmailAvailable,
};
