import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Box, Text } from '@components';

import { TPost } from '@domains';

type TProps = Pick<TPost, 'author' | 'text' | 'commentCount' | 'id'>;

export function PostBottom({ author, text, commentCount, id }: TProps) {
  const navigate = useNavigation();

  const commentText = getCommentText(commentCount);

  const navigateToPostCommentScreen = useCallback(() => {
    navigate.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id,
    });
  }, [id]);

  return (
    <Box mt="spc16">
      <Text preset="paragraphMedium" bold>
        {author.name}
      </Text>
      <Text preset="paragraphMedium">{text}</Text>
      <Text
        preset="paragraphSmall"
        bold
        color="primary"
        mt="spc8"
        onPress={navigateToPostCommentScreen}>
        {commentText}
      </Text>
    </Box>
  );
}

function getCommentText(commentCount: number): string | null {
  switch (commentCount) {
    case 0:
      return null;
    case 1:
      return 'ver comentário';
    default:
      return `ver ${commentCount} comentários`;
  }
}
