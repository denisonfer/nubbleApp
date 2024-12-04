import { useAuthCredentialsStore } from '@stores';

import { TAuthCredentialsServices } from '../authCredentialsType';

export function useAuthCredentials(): TAuthCredentialsServices {
  return useAuthCredentialsStore(state => state);
}
