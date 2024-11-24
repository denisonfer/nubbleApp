import { Image } from 'react-native';

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
        style={{ width: 32, height: 32, borderRadius: 14 }}
        resizeMode="cover"
      />
      <Text preset="paragraphMedium" ml="spc12" semiBold style={{ flex: 1 }}>
        {author.name}
      </Text>

      <Icon name="more" color="backgroundContrast" onPress={moreOptions} />
    </Box>
  );
}
