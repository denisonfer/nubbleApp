import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { PostItem, Screen } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

import { IPost, postServices } from '@domains';

import { HomeHeader } from './components/HomeHeader';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    postServices.getList().then(setPostList);
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
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingBottom: 0,
  paddingTop: 0,
  paddingHorizontal: 0,
};
