import React from 'react';
import { Image } from 'react-native';

type TProps = {
  profileURL: string;
  size?: number;
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
