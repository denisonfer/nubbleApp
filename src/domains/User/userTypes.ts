export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profileUrl: string;
  isOnline: boolean;
  fullName: string;
};

export interface IUserApi {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  profile_url: string;
  is_online: boolean;
  full_name: string;
}
