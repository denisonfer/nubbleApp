/* eslint-disable @typescript-eslint/naming-convention */
import { api, IApiPaginated, IPageParams } from '@api';

import { IPostCommentApi } from './postCommentTypes';

async function getPostCommentList(
  post_id: number,
  params?: IPageParams,
): Promise<IApiPaginated<IPostCommentApi>> {
  const response = await api.get<IApiPaginated<IPostCommentApi>>(
    '/user/post_comment',
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
  const response = await api.post<IPostCommentApi>('/user/post_comment', {
    post_id,
    message,
  });

  return response.data;
}

export const postCommentApi = { getPostCommentList, createComment };
