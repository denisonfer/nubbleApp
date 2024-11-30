import React from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { Avatar, Box, Icon, Text } from '@components';

import { TPost } from '@domains';

type TProps = Pick<TPost, 'author'>;

export function PostHeader({ author }: TProps) {
  function moreOptions() {
    //TODO: implement
  }

  return (
    <Box flexDirection="row" mb="spc16" alignItems="center">
      <Avatar profileURL={author.profileURL} />
      <Text preset="paragraphMedium" ml="spc12" semiBold style={$text}>
        {author.name}
      </Text>

      <Icon name="more" color="backgroundContrast" onPress={moreOptions} />
    </Box>
  );
}

const $text: StyleProp<TextStyle> = { flex: 1 };
