import { TAuth } from '@domains';

export type TAuthCredentialsServices = {
  authCredentials: TAuth | null;
  saveCredentials: (ac: TAuth) => void;
  removeCredentials: () => void;
};
