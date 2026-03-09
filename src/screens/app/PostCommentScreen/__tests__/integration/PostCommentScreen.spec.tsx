/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { server } from '@test';
import { fireEvent, renderScreen, screen } from 'test-utils';

import { PostCommentScreen } from '../../PostCommentScreen';

// Mock API base URL so MSW handlers match axios requests (Jest has no process.env.IP_ADDRESS)
jest.mock('@api', () => {
  const actual = jest.requireActual<typeof import('@api')>('@api');
  return {
    ...actual,
    BASE_URL: 'http://127.0.0.1:3333',
    api: require('axios').default.create({
      baseURL: 'http://127.0.0.1:3333',
    }),
  };
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('integration: PostCommentScreen', () => {
  it('should render correctly the comments list when adding a new comment', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          key: 'PostCommentScreen',
          name: 'PostCommentScreen',
          params: {
            postId: '1',
            postAuthorId: '1',
          },
        }}
      />,
    );

    const commentText = await screen.findByText(/comentário aleatório/i);
    expect(commentText).toBeTruthy();

    const input = screen.getByPlaceholderText(/adicione um comentário/i);

    fireEvent.changeText(input, 'teste');
    fireEvent.press(screen.getByText(/enviar/i));

    const newComment = await screen.findByText(/teste/i);
    expect(newComment).toBeTruthy();

    expect(commentText).toBeTruthy();
  });
});
