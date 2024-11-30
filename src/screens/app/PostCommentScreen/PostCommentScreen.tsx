import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { Screen } from '@components';
import { useAppSafeArea } from '@hooks';
import { TAppScreenProps } from '@routes';

import { TPostComment, usePostCommentList } from '@domains';

import { PostCommentBottom, PostCommentItem } from './components';

export function PostCommentScreen({
  route,
}: TAppScreenProps<'PostCommentScreen'>) {
  const { postId } = route.params;
  const { list, hasNextPage, fetchNextPage } = usePostCommentList(
    parseInt(postId),
  );
  const { bottom } = useAppSafeArea();

  function renderItem({ item }: ListRenderItemInfo<TPostComment>) {
    return <PostCommentItem postComment={item} />;
  }

  return (
    <Screen canGoBack title="Comentários" paddingHorizontal="spc24">
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
    </Screen>
  );
}
