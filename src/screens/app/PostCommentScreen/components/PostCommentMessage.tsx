import React, { useCallback, useState } from 'react';
import { Keyboard } from 'react-native';

import { MessageInput } from '@components';

import { usePostCommentCreate } from '@domains';

type TProps = {
  postId: number;
};

export function PostCommentMessage({ postId }: TProps) {
  const { createComment } = usePostCommentCreate({
    onSuccess: () => {
      setMessage('');
      Keyboard.dismiss();
    },
  });
  const [message, setMessage] = useState('');

  const onPressSend = useCallback(async () => {
    await createComment({ postId, message });
  }, [createComment, message, postId]);

  return (
    <MessageInput
      placeholder="Adicione um comentário"
      onPressSend={onPressSend}
      value={message}
      onChangeText={setMessage}
    />
  );
}
