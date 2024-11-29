import { apiAdapter } from '@api';
import { TPagination } from '@types';

import { postCommentAdapter } from './PostCommentAdapter';
import { postCommentApi } from './postCommentApi';
import { TPostComment } from './postCommentTypes';

type TProps = {
  postId: number;
  page: number;
};

async function getPostCommentList({
  postId,
  page,
}: TProps): Promise<TPagination<TPostComment>> {
  const postCommentList = await postCommentApi.getPostCommentList(postId, {
    page,
    per_page: 5,
  });

  return {
    meta: apiAdapter.toMetaData(postCommentList.meta),
    data: postCommentList.data.map(postCommentAdapter.toPostCommentList),
  };
}

export const postCommentServices = { getPostCommentList };
