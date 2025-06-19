import { useAuthCredentialsStore } from '@stores';

export function useAuth() {
  const authCredentials = useAuthCredentialsStore(
    state => state.authCredentials,
  );
  const isSignedIn = authCredentials !== null;

  const saveCredentials = useAuthCredentialsStore(
    state => state.saveCredentials,
  );
  const removeCredentials = useAuthCredentialsStore(
    state => state.removeCredentials,
  );

  return {
    credentials: authCredentials?.auth,
    user: authCredentials?.user,
    isSignedIn,
    saveCredentials,
    removeCredentials,
  };
}
