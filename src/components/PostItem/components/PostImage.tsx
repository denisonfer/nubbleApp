import React from 'react';
import { Dimensions, Image, ImageStyle, StyleProp } from 'react-native';

import { IPost } from '@domains';

type TProps = Pick<IPost, 'imageURL'>;

export function PostImage({ imageURL }: TProps) {
  return <Image source={{ uri: imageURL }} style={$image} resizeMode="cover" />;
}

const $image: StyleProp<ImageStyle> = {
  width: Dimensions.get('screen').width,
  height: 260,
  marginHorizontal: -24,
};
