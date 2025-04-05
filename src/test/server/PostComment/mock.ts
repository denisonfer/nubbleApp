import { IApiPaginated } from '@api';
import { IPostCommentApi } from '@domains';

const POST_ID = 1;

const postCommentAPI: IPostCommentApi = {
  id: 97,
  message: 'comentário aleatório',
  user_id: 4,
  post_id: POST_ID,
  created_at: '2023-10-18T22:19:17.000+00:00',
  updated_at: '2023-10-21T07:46:21.821+00:00',
  user: {
    id: 4,
    first_name: 'Usuário',
    last_name: 'Teste',
    username: 'usuario_teste',
    email: 'usuario@teste.com',
    profile_url:
      'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/6-marcelo.png',
    is_online: true,
    full_name: 'Usuário Teste',
  },
  post: {
    id: POST_ID,
    text: 'Post de teste',
    user_id: 4,
    image_url:
      'https://nubble-development.s3.sa-east-1.amazonaws.com/backend-integration/6-marcelo.png',
    is_fixed: false,
    is_activated: true,
    created_at: '2023-10-18T22:19:17.000+00:00',
    updated_at: '2023-10-21T07:46:21.821+00:00',
    status: 'active',
    meta: {},
  },
};

const mockedPostCommentResponse: IApiPaginated<IPostCommentApi> = {
  meta: {
    total: 1,
    per_page: 10,
    current_page: 1,
    last_page: 1,
    first_page: 1,
    first_page_url: '/?page=1',
    last_page_url: '/?page=1',
    next_page_url: null,
    previous_page_url: null,
  },
  data: [postCommentAPI],
};

export const mockedData = {
  POST_ID,
  mockedPostCommentResponse,
};
