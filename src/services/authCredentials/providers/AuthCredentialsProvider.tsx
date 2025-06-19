import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { registerInterceptor } from '@api';
import { authServices, TAuth, TUser } from '@domains';

import { authCredentialsStorage } from '../authCredentialsStorage';
import { TAuthCredentialsServices } from '../authCredentialsType';

export const AuthCredentialsContext = createContext<TAuthCredentialsServices>({
  isLoading: true,
  authCredentials: null,
  saveCredentials: () => {},
  removeCredentials: () => {},
  updateUser: () => {},
});

export function AuthCredentialsProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [authCredentials, setAuthCredentials] = useState<TAuth | null>(null);

  useEffect(() => {
    initAuthCredentials();
  }, []);

  useEffect(() => {
    const interceptor = registerInterceptor({
      authCredentials,
      removeCredentials,
      saveCredentials,
    });

    return () => {
      interceptor();
    };
  }, [authCredentials]);

  async function initAuthCredentials(): Promise<void> {
    try {
      const ac = await authCredentialsStorage.get();
      if (!ac) return;
      authServices.updateApiToken(ac.auth.token);
      setAuthCredentials(ac);
    } catch (error) {
      // TODO: handle error
      console.log('[initAuthCredentials] Error', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(ac: TAuth): Promise<void> {
    authServices.updateApiToken(ac.auth.token);
    await authCredentialsStorage.set(ac);
    setAuthCredentials(ac);
  }

  function updateUser(user: TUser) {
    if (authCredentials) {
      saveCredentials({ ...authCredentials, user });
    }
  }

  async function removeCredentials(): Promise<void> {
    authServices.removeApiToken();
    await authCredentialsStorage.remove();
    setAuthCredentials(null);
  }

  return (
    <AuthCredentialsContext.Provider
      value={{
        isLoading,
        authCredentials,
        saveCredentials,
        removeCredentials,
        updateUser,
      }}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
