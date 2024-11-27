import React from 'react';
import { Image, ImageStyle, StyleProp, TextStyle } from 'react-native';

import { Box, Icon, Text } from '@components';

import { IPost } from '@domains';

type TProps = Pick<IPost, 'author'>;

export function PostHeader({ author }: TProps) {
  function moreOptions() {
    //TODO: implement
  }

  return (
    <Box flexDirection="row" mb="spc16" alignItems="center">
      <Image
        source={{ uri: author.profileURL }}
        style={$image}
        resizeMode="cover"
      />
      <Text preset="paragraphMedium" ml="spc12" semiBold style={$text}>
        {author.name}
      </Text>

      <Icon name="more" color="backgroundContrast" onPress={moreOptions} />
    </Box>
  );
}

const $image: StyleProp<ImageStyle> = {
  width: 32,
  height: 32,
  borderRadius: 14,
};
const $text: StyleProp<TextStyle> = { flex: 1 };
