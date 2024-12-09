import { IUserApi, TUser } from '../User/userTypes';

export type TAuth = {
  auth: {
    token: string;
    refreshToken: string;
    expiresAt: string;
  };
  user: TUser;
};

export interface IAuthApi {
  auth: {
    type: string;
    token: string;
    refreshToken: string;
    expires_at: string;
  };
  user: IUserApi;
}

export type TAuthSignUpDTO = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};
export interface IAuthSignUpDTOApi {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IIsValueAvailableApi {
  message: string;
  isAvailable: boolean;
}
