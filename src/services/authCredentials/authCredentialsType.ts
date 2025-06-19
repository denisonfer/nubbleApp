import { TAuth, TUser } from '@domains';

export type TAuthCredentialsServices = {
  isLoading: boolean;
  authCredentials: TAuth | null;
  saveCredentials: (ac: TAuth) => void;
  removeCredentials: () => void;
  updateUser?: (user: TUser) => void;
};
