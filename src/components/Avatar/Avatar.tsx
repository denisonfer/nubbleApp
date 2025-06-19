import React from 'react';
import { Image } from 'react-native';
import { Box } from '../Box/Box';

type TProps = {
  profileURL: string;
  /** @default 32 */
  size?: number;
  /** @default 16 */
  borderRadius?: number;
};

export function Avatar({ profileURL, size = 32, borderRadius = 16 }: TProps) {
  console.log('profileURL: ', profileURL);

  if (!profileURL) {
    return (
      <Box
        width={size}
        height={size}
        borderRadius="br16"
        borderWidth={1}
        borderColor="gray3"
        backgroundColor="gray3"
      />
    );
  }

  return (
    <Image
      source={{ uri: profileURL }}
      borderRadius={borderRadius}
      height={size}
      width={size}
      resizeMode="cover"
    />
  );
}
