/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from '@api';
import { IPostCommentApi, POST_COMMENT_PATH } from '@domains';
import { http, HttpResponse } from 'msw';
import { mockedData } from './mock';

const FULL_URL = `${BASE_URL}${POST_COMMENT_PATH}`;

const inMemoryResponse = { ...mockedData.mockedPostCommentResponse };

export const postCommentHandlers = [
  http.get(FULL_URL, () => {
    return HttpResponse.json(inMemoryResponse, { status: 200 });
  }),

  http.post<any, { post_id: number; message: string }>(
    FULL_URL,
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
