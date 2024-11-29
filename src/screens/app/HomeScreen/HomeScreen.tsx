import React, { useRef } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useScrollToTop } from '@react-navigation/native';

import { PostItem, Screen } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

import { IPost, usePostList } from '@domains';

import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeader } from './components/HomeHeader';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  const flatListRef = useRef<FlatList<IPost>>(null);
  const { postList, loading, error, refresh, fetchNextPage } = usePostList();
  useScrollToTop(flatListRef);

  function renderPost({ item: post }: ListRenderItemInfo<IPost>) {
    return <PostItem post={post} />;
  }

  return (
    <Screen style={$screen}>
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={post => post.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty loading={loading} error={error} refetch={refresh} />
        }
        contentContainerStyle={$contentContainer(postList.length || 0)}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        refreshing={loading}
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  flex: 1,
  paddingBottom: 0,
  paddingTop: 0,
  paddingHorizontal: 0,
};

const $contentContainer = (postListLength: number): StyleProp<ViewStyle> => {
  return { flex: postListLength === 0 ? 1 : undefined };
};
