import { IPostListApi, TPost } from '../Post/types';
import { IUserApi, TUser } from '../User';

export type TPostReactionType = 'favorite' | 'like';

// API
export interface IPostReactionBaseApi {
  id: number;
  emoji_type: TPostReactionType;
  user_id: number;
  post_id: number;
  is_checked: boolean;
  created_at: string; // '2026-04-03T12:00:00Z'
  updated_at: string; // '2026-04-03T12:00:00Z'
}

export interface IPostReactionApi extends IPostReactionBaseApi {
  user: IUserApi;
  post: Pick<IPostListApi, 'id' | 'text' | 'image_url' | 'status'>;
}

// App
export type TPostReactionBase = {
  id: number;
  emojiType: TPostReactionType;
  userId: number;
  postId: number;
  isChecked: boolean;
  createdAt: string; // '2026-04-03T12:00:00Z'
  updatedAt: string; // '2026-04-03T12:00:00Z'
};

export type TPostReaction = TPostReactionBase & {
  author: TUser;
  post: Pick<TPost, 'id' | 'text' | 'imageURL'>;
};
