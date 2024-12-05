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

export const authServices = { signIn, logout };
