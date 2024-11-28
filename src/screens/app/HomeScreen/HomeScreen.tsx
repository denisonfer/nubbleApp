import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { PostItem, Screen } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

import { IPost, postServices } from '@domains';

import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeader } from './components/HomeHeader';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [postList, setPostList] = useState<IPost[]>([]);

  const fetchPostList = useCallback(async () => {
    try {
      setError(undefined);
      setLoading(true);
      const postList = await postServices.getList();
      setPostList(postList);
    } catch (error) {
      console.error('fetchPostList - ERROR: ', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPostList();
  }, []);

  function renderPost({ item: post }: ListRenderItemInfo<IPost>) {
    return <PostItem post={post} />;
  }

  return (
    <Screen style={$screen}>
      <FlatList
        data={postList}
        keyExtractor={post => post.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty loading={loading} error={error} refetch={fetchPostList} />
        }
        contentContainerStyle={$contentContainer(postList.length || 0)}
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
