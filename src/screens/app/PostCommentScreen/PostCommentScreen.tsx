import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Box, Screen } from '@components';
import { useAppSafeArea } from '@hooks';
import { TAppScreenProps } from '@routes';

import { TPostComment, usePostCommentList } from '@domains';

import {
  PostCommentBottom,
  PostCommentItem,
  PostCommentMessage,
} from './components';

export function PostCommentScreen({
  route,
}: TAppScreenProps<'PostCommentScreen'>) {
  const { postId, postAuthorId } = route.params;
  const { bottom } = useAppSafeArea();
  const { list, hasNextPage, fetchNextPage, refresh } = usePostCommentList(
    parseInt(postId),
  );

  function renderItem({ item }: ListRenderItemInfo<TPostComment>) {
    return (
      <PostCommentItem
        postComment={item}
        onRemoveComment={refresh}
        postAuthorId={postAuthorId}
      />
    );
  }

  return (
    <Screen flex={1} canGoBack title="Comentários" paddingHorizontal="spc24">
      <Box flex={1} justifyContent="space-between">
        <FlatList
          contentContainerStyle={{ paddingBottom: bottom }}
          data={list}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListFooterComponent={
            <PostCommentBottom
              hasNextPage={hasNextPage}
              onPress={fetchNextPage}
            />
          }
          showsVerticalScrollIndicator={false}
        />
        <PostCommentMessage postId={parseInt(postId)} onAddComment={refresh} />
      </Box>
    </Screen>
  );
}
