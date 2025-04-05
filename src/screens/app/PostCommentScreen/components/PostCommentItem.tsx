import React from 'react';
import { Alert, Pressable } from 'react-native';

import { useToastServices } from '@services';

import { Avatar, Box, Text } from '@components';

import {
  postCommentServices,
  TPostComment,
  usePostCommentRemove,
} from '@domains';

type TProps = {
  postComment: TPostComment;
  postId: number;
  postAuthorId: string;
};

export function PostCommentItem({ postComment, postAuthorId, postId }: TProps) {
  const { showToast } = useToastServices();
  const { mutate } = usePostCommentRemove({
    onSuccess: () => {
      showToast({
        type: 'success',
        message: 'Comentário deletado',
      });
    },
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
        onPress: () => mutate({ commentId: parseInt(postComment.id), postId }),
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
    <Pressable
      testID="comment-item"
      disabled={!isAllowedRemoveComment}
      onLongPress={removeComment}>
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
