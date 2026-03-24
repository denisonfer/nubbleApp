import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

import { TPost } from '@domains';
import { SCREEN_WIDTH } from '@utils';

type TProps = Pick<TPost, 'imageURL'>;

export function PostImage({ imageURL }: TProps) {
  return <Image source={{ uri: imageURL }} style={$image} resizeMode="cover" />;
}

const $image: StyleProp<ImageStyle> = {
  width: SCREEN_WIDTH,
  height: 260,
  marginHorizontal: -24,
};
