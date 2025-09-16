import React, { useRef, useState } from 'react';

import { PermissionManager, Screen } from '@components';
import { useCameraRoll, usePermission } from '@services';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';
import { Header } from './components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUM_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS;

export function NewPostScreen() {
  const { status } = usePermission('photoLibrary');
  const flatListRef = useRef<FlatList>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const { photoList, fetchNextPage } = useCameraRoll(
    status === 'granted',
    setSelectedPhoto,
  );

  const onSelectPhoto = (photo: string) => {
    setSelectedPhoto(photo);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderItem = ({ item }: ListRenderItemInfo<string>) => (
    <Pressable onPress={() => onSelectPhoto(item)}>
      <Image
        key={item}
        source={{ uri: item }}
        style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
      />
    </Pressable>
  );

  return (
    <PermissionManager
      permissionName="photoLibrary"
      description="Conceda a permissão para acessar a galeria de fotos.">
      <Screen canGoBack title="Novo Post" addHeaderPadding>
        <FlatList
          ref={flatListRef}
          data={photoList}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          keyExtractor={item => item}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <Header imageUri={selectedPhoto ?? ''} imageWidth={SCREEN_WIDTH} />
          }
        />
      </Screen>
    </PermissionManager>
  );
}
