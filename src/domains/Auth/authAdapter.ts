import { userAdapter } from '../User/userAdapter';

import { IAuthApi, TAuth } from './authTypes';

function toAuth(authApi: IAuthApi): TAuth {
  return {
    auth: {
      token: authApi.auth.token,
    },
    user: userAdapter.toUser(authApi.user),
  };
}

export const authAdapter = { toAuth };
