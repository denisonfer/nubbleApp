import { api } from '@api';

import { authAdapter } from './authAdapter';
import { authApi } from './authApi';
import { TAuth } from './authTypes';

async function signIn(email: string, password: string): Promise<TAuth> {
  const response = await authApi.signIn(email, password);

  return authAdapter.toAuth(response);
}

async function logout(): Promise<string> {
  const response = await authApi.logout();

  return response;
}

function updateApiToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeApiToken() {
  api.defaults.headers.common.Authorization = null;
}

export const authServices = { signIn, logout, updateApiToken, removeApiToken };
