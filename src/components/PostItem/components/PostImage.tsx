import { Dimensions, Image } from 'react-native';

import { IPost } from '@domains';

type TProps = Pick<IPost, 'imageURL'>;

export function PostImage({ imageURL }: TProps) {
  return (
    <Image
      source={{ uri: imageURL }}
      style={{ width: Dimensions.get('screen').width, height: 260 }}
      resizeMode="cover"
    />
  );
}
