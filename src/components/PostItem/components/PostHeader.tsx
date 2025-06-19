import React from 'react';

import { Box, Icon, ProfileUser } from '@components';

import { TPost } from '@domains';

type TProps = Pick<TPost, 'author'>;

export function PostHeader({ author }: TProps) {
  function moreOptions() {
    //TODO: implement
  }

  return (
    <Box
      flexDirection="row"
      mb="spc16"
      alignItems="center"
      justifyContent="space-between">
      <ProfileUser
        user={{
          id: +author.id,
          profileUrl: author.profileURL,
          userName: author.name,
        }}
      />

      <Icon name="more" color="backgroundContrast" onPress={moreOptions} />
    </Box>
  );
}
