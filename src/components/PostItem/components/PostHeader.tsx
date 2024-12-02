import React, { useCallback } from 'react';
import { Pressable, StyleProp, TextStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Avatar, Box, Icon, Text } from '@components';

import { TPost } from '@domains';

type TProps = Pick<TPost, 'author'>;

export function PostHeader({ author }: TProps) {
  const navigation = useNavigation();

  function moreOptions() {
    //TODO: implement
  }

  const navigateToProfileScreen = useCallback(() => {
    navigation.navigate('ProfileScreen', { userId: author.id });
  }, [author.id]);

  return (
    <Box flexDirection="row" mb="spc16" alignItems="center">
      <Pressable onPress={navigateToProfileScreen}>
        <Avatar profileURL={author.profileURL} />
      </Pressable>
      <Text preset="paragraphMedium" ml="spc12" semiBold style={$text}>
        {author.name}
      </Text>

      <Icon name="more" color="backgroundContrast" onPress={moreOptions} />
    </Box>
  );
}

const $text: StyleProp<TextStyle> = { flex: 1 };
