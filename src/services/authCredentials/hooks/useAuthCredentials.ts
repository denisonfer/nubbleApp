import { useContext } from 'react';

import { TAuthCredentialsServices } from '../authCredentialsType';
import { AuthCredentialsContext } from '../providers/AuthCredentialsProvider';

export function useAuthCredentials(): TAuthCredentialsServices {
  const context = useContext(AuthCredentialsContext);

  if (!context) {
    throw new Error(
      'useAuthCredentials must be used within a AuthCredentialsProvider',
    );
  }

  return context;
  // return useAuthCredentialsStore(state => state);
}
