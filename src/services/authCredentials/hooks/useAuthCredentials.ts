import { useAuthCredentialsStore } from '@stores';

import { TAuthCredentialsServices } from '../authCredentialsType';

export function useAuthCredentials(): TAuthCredentialsServices {
  return useAuthCredentialsStore(state => state);

  /* function startAuthFlow() {
    console.log('startAuthFlow: ');

    try {
      if (!authCredentials) return null;

      authServices.updateApiToken(authCredentials.auth.token);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    startAuthFlow();
  }, [authCredentials]); */
}
