import React from 'react';

import { Box, Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';

import { usePostCommentList } from '@domains';

export function PostCommentScreen({
  route,
}: TAppScreenProps<'PostCommentScreen'>) {
  const { postId } = route.params;
  const { list } = usePostCommentList(parseInt(postId));
  console.log('list: ', list);

  return (
    <Screen canGoBack title="Comentários">
      <Box>
        <Text>PostCommentScreen</Text>
      </Box>
    </Screen>
  );
}
