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
