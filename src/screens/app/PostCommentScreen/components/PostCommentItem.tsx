import React from 'react';

import { Avatar, Box, Text } from '@components';

import { TPostComment } from '@domains';

type TProps = {
  postComment: TPostComment;
};

export function PostCommentItem({ postComment }: TProps) {
  return (
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
  );
}
