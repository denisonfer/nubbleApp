import React from 'react';
import { ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';

import { InfinityScrollList, PostItem, Screen } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

import { postServices, TPost } from '@domains';

import { HomeHeader } from './components/HomeHeader';
import { EQueryKeys } from '@infra';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  function renderPost({ item: post }: ListRenderItemInfo<TPost>) {
    return <PostItem post={post} />;
  }

  return (
    <Screen style={$screen}>
      <InfinityScrollList
        getList={postServices.getList}
        renderItem={renderPost}
        queryKey={EQueryKeys.UsePostList}
        flatListProps={{
          ListHeaderComponent: <HomeHeader />,
        }}
        emptyListProps={{
          emptyMessage: 'Não há posts',
          errorMessage: 'Erro ao carregar posts',
        }}
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
