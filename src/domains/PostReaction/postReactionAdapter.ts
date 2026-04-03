import { userAdapter } from '../User/userAdapter';
import {
  IPostReactionApi,
  IPostReactionBaseApi,
  TPostReaction,
  TPostReactionBase,
} from './postReactionType';

function toPostReactionBase(
  postReactionBaseApi: IPostReactionBaseApi,
): TPostReactionBase {
  return {
    id: postReactionBaseApi.id,
    emojiType: postReactionBaseApi.emoji_type,
    userId: postReactionBaseApi.user_id,
    postId: postReactionBaseApi.post_id,
    isChecked: postReactionBaseApi.is_checked,
    createdAt: postReactionBaseApi.created_at,
    updatedAt: postReactionBaseApi.updated_at,
  };
}

function toPostReaction(postReactionApi: IPostReactionApi): TPostReaction {
  return {
    ...toPostReactionBase(postReactionApi),
    author: userAdapter.toUser(postReactionApi.user),
    post: {
      id: postReactionApi.post.id.toString(),
      text: postReactionApi.post.text,
      imageURL: postReactionApi.post.image_url,
    },
  };
}

export const postReactionAdapter = {
  toPostReactionBase,
  toPostReaction,
};
