/* eslint-disable @typescript-eslint/no-explicit-any */
import { server } from '@test';
import { fireEvent, renderScreen, screen } from 'test-utils';

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

    // Verificar se o comentário original está sendo exibido
    const commentText = await screen.findByText(/comentário aleatório/i);
    expect(commentText).toBeTruthy();

    // achar o input
    const input = screen.getByPlaceholderText(/adicione um comentário/i);

    // digitar a mensagem
    fireEvent.changeText(input, 'teste');
    //clicar no botão de enviar
    fireEvent.press(screen.getByText(/enviar/i));

    // esperar o novo comentário aparecer
    const newComment = await screen.findByText(/teste/i);
    expect(newComment).toBeTruthy();

    // Verificar se o comentário original ainda está sendo exibido
    expect(commentText).toBeTruthy();
  });
});
