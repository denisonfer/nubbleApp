import { userAdapter } from '../User/userAdapter';

import { IAuthApi, TAuth } from './authTypes';

function toAuth(authApi: IAuthApi): TAuth {
  return {
    auth: {
      token: authApi.auth.token,
      refreshToken: authApi.auth.refreshToken,
      expiresAt: authApi.auth.expires_at,
    },
    user: userAdapter.toUser(authApi.user),
  };
}

export const authAdapter = { toAuth };
