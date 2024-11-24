import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { PostItem, Screen } from '@components';
import { TAppBottomTabScreenProps } from '@routes';

import { IPost, postServices } from '@domains';

export function HomeScreen({}: TAppBottomTabScreenProps<'HomeScreen'>) {
  const [postList, setPostList] = useState<IPost[]>([]);
  console.log('postList: ', postList);

  useEffect(() => {
    postServices.getList().then(setPostList);
  }, []);

  function renderPost({ item: post }: ListRenderItemInfo<IPost>) {
    return <PostItem post={post} />;
  }

  return (
    <Screen>
      <FlatList
        data={postList}
        keyExtractor={post => post.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}
