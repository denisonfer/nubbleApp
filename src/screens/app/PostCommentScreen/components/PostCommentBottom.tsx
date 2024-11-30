import React from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { Text } from '@components';

type TProps = {
  hasNextPage?: boolean;
  onPress: () => void;
};

export function PostCommentBottom({ hasNextPage, onPress }: TProps) {
  if (!hasNextPage) return null;

  return (
    <Pressable style={$pressable} onPress={onPress}>
      <Text preset="paragraphMedium" bold color="primary">
        Ver mais
      </Text>
    </Pressable>
  );
}

const $pressable: StyleProp<ViewStyle> = {
  alignItems: 'center',
};
