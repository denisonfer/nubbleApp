import { api } from '@api';

import { IAuthApi } from './authTypes';

async function signIn(email: string, password: string): Promise<IAuthApi> {
  const response = await api.post<IAuthApi>('/login', { email, password });

  return response.data;
}

async function logout(): Promise<string> {
  const response = await api.get<{ message: string }>('/profile/logout', {
    headers: {
      Authorization: `Bearer ${'NQ.etbyaNWw6rQg4F3Oyj0_U7YJYQj3MGoYz13HDQ68xFFF17uDU80j0cYOhR64'}`,
    },
  });

  return response.data.message;
}

export const authApi = { signIn, logout };
