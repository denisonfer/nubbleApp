import { formatDateRelative } from '@utils';

import { IPostCommentApi, TPostComment } from './postCommentTypes';

function toPostCommentList(postCommentApi: IPostCommentApi): TPostComment {
  return {
    id: postCommentApi.id.toString(),
    message: postCommentApi.message,
    createdAt: postCommentApi.created_at,
    createdAtRelative: formatDateRelative(postCommentApi.created_at),
    author: {
      id: postCommentApi.user.id.toString(),
      profileURL: postCommentApi.user.profile_url,
      name: postCommentApi.user.full_name,
      userName: postCommentApi.user.username,
    },
  };
}

export const postCommentAdapter = { toPostCommentList };
