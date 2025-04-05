/* eslint-disable @typescript-eslint/no-explicit-any */
import { server } from '@test';
import { renderScreen, screen } from 'test-utils';

import { PostCommentScreen } from '../../PostCommentScreen';

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
  });
});
