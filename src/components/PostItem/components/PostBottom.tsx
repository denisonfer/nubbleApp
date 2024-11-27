import React from 'react';

import { Box, Text } from '@components';

import { IPost } from '@domains';

type TProps = Pick<IPost, 'author' | 'text' | 'commentCount'>;

export function PostBottom({ author, text, commentCount }: TProps) {
  const commentText = getCommentText(commentCount);

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
        onPress={() => {}}>
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
