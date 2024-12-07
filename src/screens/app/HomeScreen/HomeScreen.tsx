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

import { TPost, usePostList } from '@domains';

import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeader } from './components/HomeHeader';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  const flatListRef = useRef<FlatList<TPost>>(null);
  useScrollToTop(flatListRef);
  const {
    list: postList,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
  } = usePostList();

  function renderPost({ item: post }: ListRenderItemInfo<TPost>) {
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
          <HomeEmpty isLoading={isLoading} error={isError} refetch={refetch} />
        }
        contentContainerStyle={$contentContainer(postList.length || 0)}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            progressViewOffset={50}
          />
        }
        refreshing={isLoading}
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
