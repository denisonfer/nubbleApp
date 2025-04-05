/* eslint-disable @typescript-eslint/naming-convention */
import { api, IApiPaginated, IPageParams } from '@api';

import { IPostCommentApi } from './postCommentTypes';

export const POST_COMMENT_PATH = '/user/post_comment';

async function getPostCommentList(
  post_id: number,
  params?: IPageParams,
): Promise<IApiPaginated<IPostCommentApi>> {
  const response = await api.get<IApiPaginated<IPostCommentApi>>(
    POST_COMMENT_PATH,
    {
      params: {
        post_id,
        ...params,
      },
    },
  );

  return response.data;
}

async function createComment(
  post_id: number,
  message: string,
): Promise<IPostCommentApi> {
  const response = await api.post<IPostCommentApi>(POST_COMMENT_PATH, {
    post_id,
    message,
  });

  return response.data;
}

async function removeComment(comment_id: number): Promise<string> {
  const response = await api.delete<{ message: string }>(
    `${POST_COMMENT_PATH}/${comment_id}`,
  );

  return response.data.message;
}

export const postCommentApi = {
  getPostCommentList,
  createComment,
  removeComment,
};
