import { api, IApiPaginated, IPageParams } from '@api';

import { IPostCommentApi } from './postCommentTypes';

async function getPostCommentList(
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

export const postCommentApi = { getPostCommentList };
