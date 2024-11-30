import React from 'react';
import { Image } from 'react-native';

type TProps = {
  profileURL: string;
  /** @default 32 */
  size?: number;
  /** @default 16 */
  borderRadius?: number;
};

export function Avatar({ profileURL, size = 32, borderRadius = 16 }: TProps) {
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
