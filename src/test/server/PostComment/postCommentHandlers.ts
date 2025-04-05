import { BASE_URL, IApiPaginated } from '@api';
import { IPostCommentApi, POST_COMMENT_PATH } from '@domains';
import { http, HttpResponse } from 'msw';
import { mockedData } from './mock';

export const postCommentHandlers = [
  http.get(`${BASE_URL}${POST_COMMENT_PATH}`, () => {
    const response: IApiPaginated<IPostCommentApi> =
      mockedData.mockedPostCommentResponse;

    return HttpResponse.json(response, { status: 200 });
  }),
];
