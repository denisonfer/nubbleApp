import React from 'react';

import { Box, Icon, Text, TIconNames, TouchableOpacityBox } from '@components';

import { IPost } from '@domains';

type TPropsPostActions = Pick<
  IPost,
  'reactionCount' | 'commentCount' | 'favoriteCount'
>;

export function PostActions({
  reactionCount,
  commentCount,
  favoriteCount,
}: TPropsPostActions) {
  function likePost() {
    //TODO: implement
  }

  function navigateToComments() {
    //TODO: implement
  }

  function favoritePost() {
    //TODO: implement
  }

  return (
    <Box flexDirection="row" mt="spc16">
      <ActionItem
        text={reactionCount}
        icon={{ default: 'heart', marked: 'heartFill' }}
        onPress={likePost}
        marked
      />
      <ActionItem
        text={commentCount}
        icon={{ default: 'comment', marked: 'comment' }}
        onPress={navigateToComments}
        marked={false}
      />
      <ActionItem
        text={favoriteCount}
        icon={{ default: 'bookmark', marked: 'bookmarkFill' }}
        onPress={favoritePost}
        marked={false}
      />
    </Box>
  );
}

type TProps = {
  text: number;
  marked: boolean;
  icon: {
    default: TIconNames;
    marked: TIconNames;
  };
  onPress: () => void;
};

const ActionItem = ({ text, marked, icon, onPress }: TProps) => {
  return (
    <TouchableOpacityBox
      flexDirection="row"
      alignItems="center"
      onPress={onPress}
      mr="spc24">
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'marked' : undefined}
      />
      {text > 0 && (
        <Text preset="paragraphSmall" bold ml="spc4">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
};
