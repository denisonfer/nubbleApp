import { IUserApi, TUser } from '../User/userTypes';

export type TAuth = {
  auth: {
    token: string;
  };
  user: TUser;
};

export interface IAuthApi {
  auth: {
    type: string;
    token: string;
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
