import React from 'react';

import { Screen } from '@components';
import { useCameraRoll } from '@services';
import { Dimensions, FlatList, Image, ListRenderItemInfo } from 'react-native';
import { Header } from './components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUM_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

export function NewPostScreen() {
  const { photoList, fetchNextPage } = useCameraRoll(true);

  const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <Image
      key={item}
      source={{ uri: item }}
      style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
    />
  );

  return (
    <Screen canGoBack title="Novo Post" addHeaderPadding>
      <FlatList
        data={photoList}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        keyExtractor={item => item}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <Header imageUri={photoList[4]} imageWidth={SCREEN_WIDTH} />
        }
      />
    </Screen>
  );
}
