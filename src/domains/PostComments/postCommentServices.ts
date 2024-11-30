import { apiAdapter } from '@api';
import { TPostComment } from '@domains';
import { TPagination } from '@types';

import { postCommentAdapter } from './postCommentAdapter';
import { postCommentApi } from './postCommentApi';

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
    per_page: 10,
  });

  return {
    meta: apiAdapter.toMetaData(postCommentList.meta),
    data: postCommentList.data.map(postCommentAdapter.toPostCommentList),
  };
}

async function createComment(
  postId: number,
  message: string,
): Promise<TPostComment> {
  const postComment = await postCommentApi.createComment(postId, message);

  return postCommentAdapter.toPostCommentList(postComment);
}

export const postCommentServices = { getPostCommentList, createComment };
