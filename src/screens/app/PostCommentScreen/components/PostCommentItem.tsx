import React from 'react';
import { Alert, Pressable } from 'react-native';

import { Avatar, Box, Text } from '@components';

import {
  postCommentServices,
  TPostComment,
  usePostCommentRemove,
} from '@domains';

type TProps = {
  postComment: TPostComment;
  postAuthorId: string;
  onRemoveComment: () => void;
};

export function PostCommentItem({
  postComment,
  onRemoveComment,
  postAuthorId,
}: TProps) {
  const { mutate } = usePostCommentRemove({
    onSuccess: onRemoveComment,
  });

  const isAllowedRemoveComment = postCommentServices.isAllowedRemoveComment(
    1,
    parseInt(postComment.author.id),
    parseInt(postAuthorId),
  );

  function removeComment() {
    Alert.alert('Remover comentário', 'Deseja remover esse comentário?', [
      {
        text: 'Remover',
        onPress: () => mutate({ commentId: parseInt(postComment.id) }),
        style: 'destructive',
      },
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }

  return (
    <Pressable disabled={!isAllowedRemoveComment} onLongPress={removeComment}>
      <Box flexDirection="row" mb="spc16" alignItems="center">
        <Avatar profileURL={postComment.author.profileURL} />

        <Box ml="spc12" flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.name}
          </Text>
          <Text preset="paragraphSmall">
            {postComment.message} - {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
