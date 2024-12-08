import { api } from '@api';

import { authAdapter } from './authAdapter';
import { authApi } from './authApi';
import { TAuth, TAuthSignUpDTO } from './authTypes';

async function signIn(email: string, password: string): Promise<TAuth> {
  const response = await authApi.signIn(email, password);

  return authAdapter.toAuth(response);
}

async function signUp(data: TAuthSignUpDTO): Promise<void> {
  await authApi.signUp(data);
}

async function forgotPassword(email: string): Promise<void> {
  await authApi.forgotPassword(email);
}

async function logout(): Promise<string> {
  const response = await authApi.logout();

  return response;
}

async function isUserNameAvailable(username: string): Promise<boolean> {
  const response = await authApi.isUserNameAvailable(username);
  const isUnavailable = response.isAvailable;
  return isUnavailable;
}

async function isEmailAvailable(email: string): Promise<boolean> {
  const response = await authApi.isEmailAvailable(email);
  const isUnavailable = response.isAvailable;
  return isUnavailable;
}

function updateApiToken(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function removeApiToken() {
  api.defaults.headers.common.Authorization = null;
}

export const authServices = {
  signIn,
  signUp,
  forgotPassword,
  logout,
  updateApiToken,
  removeApiToken,
  isUserNameAvailable,
  isEmailAvailable,
};
