/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPostCommentApi, POST_COMMENT_PATH } from '@domains';
import { http, HttpResponse } from 'msw';
import { mockedData } from './mock';

// Use path pattern to match any base URL (Jest/Node has no location.href)
const POST_COMMENT_PATTERN = new RegExp(`.*${POST_COMMENT_PATH.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`);

const inMemoryResponse = { ...mockedData.mockedPostCommentResponse };

export const postCommentHandlers = [
  http.get(POST_COMMENT_PATTERN, () => {
    return HttpResponse.json(inMemoryResponse, { status: 200 });
  }),

  http.post<any, { post_id: number; message: string }>(
    POST_COMMENT_PATTERN,
    async ({ request }) => {
      const body = await request.json();

      const newPostCommentAPI: IPostCommentApi = {
        ...mockedData.postCommentAPI,
        id: 999,
        post_id: body.post_id,
        message: body.message || '',
      };

      inMemoryResponse.data = [newPostCommentAPI, ...inMemoryResponse.data];
      inMemoryResponse.meta = {
        ...inMemoryResponse.meta,
        total: inMemoryResponse.meta.total + 1,
      };

      return HttpResponse.json(newPostCommentAPI, { status: 201 });
    },
  ),
];
