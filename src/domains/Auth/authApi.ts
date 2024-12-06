import { api } from '@api';

import { IAuthApi } from './authTypes';

async function signIn(email: string, password: string): Promise<IAuthApi> {
  const response = await api.post<IAuthApi>('/login', { email, password });

  return response.data;
}

async function logout(): Promise<string> {
  const response = await api.get<{ message: string }>('/profile/logout');

  return response.data.message;
}

export const authApi = { signIn, logout };
