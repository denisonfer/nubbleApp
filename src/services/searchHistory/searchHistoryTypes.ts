import { TUser } from '@domains';

export type TSearchHistoryService = {
  usersSearchHistory: TUser[];
  addToUsersSearchHistory: (user: TUser) => void;
  removeFromUsersSearchHistory: (userId: TUser['id']) => void;
  clearUsersSearchHistory: () => void;
};
