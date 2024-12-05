/* eslint-disable @typescript-eslint/naming-convention */
import { api, IApiPaginated, IPageParams } from '@api';

import { IPostCommentApi } from './postCommentTypes';

const ENDPOINT = '/user/post_comment';

async function getPostCommentList(
  post_id: number,
  params?: IPageParams,
): Promise<IApiPaginated<IPostCommentApi>> {
  const response = await api.get<IApiPaginated<IPostCommentApi>>(ENDPOINT, {
    params: {
      post_id,
      ...params,
    },
  });

  return response;
}

async function createComment(
  post_id: number,
  message: string,
): Promise<IPostCommentApi> {
  const response = await api.post<IPostCommentApi>(ENDPOINT, {
    post_id,
    message,
  });

  return response;
}

async function removeComment(comment_id: number): Promise<string> {
  const response = await api.del<{ message: string }>(
    `${ENDPOINT}/${comment_id}`,
  );

  return response.message;
}

export const postCommentApi = {
  getPostCommentList,
  createComment,
  removeComment,
};
