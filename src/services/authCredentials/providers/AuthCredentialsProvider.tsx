import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { authServices, TAuth } from '@domains';

import { authCredentialsStorage } from '../authCredentialsStorage';
import { TAuthCredentialsServices } from '../authCredentialsType';

export const AuthCredentialsContext = createContext<TAuthCredentialsServices>({
  isLoading: true,
  authCredentials: null,
  saveCredentials: () => {},
  removeCredentials: () => {},
});

export function AuthCredentialsProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [authCredentials, setAuthCredentials] = useState<TAuth | null>(null);

  useEffect(() => {
    initAuthCredentials();
  }, []);

  async function initAuthCredentials(): Promise<void> {
    try {
      const ac = await authCredentialsStorage.get();
      if (!ac) return;
      authServices.updateApiToken(ac.auth.token);
      setAuthCredentials(ac);
      setIsLoading(false);
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
      }}>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
