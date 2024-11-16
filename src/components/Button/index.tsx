import React from 'react';
import { ActivityIndicator } from '../ActivityIndicator';
import { TouchableOpacityBox } from '../Box/Box';
import { Text } from '../Text';
import { buttonPresetMapper, TButtonProps } from './types';

export function Button({
  title,
  isLoading = false,
  preset = 'primary',
  isDisabled = false,
  ...touchableOpacityBoxProps
}: TButtonProps) {
  const buttonPreset =
    buttonPresetMapper[preset][isDisabled ? 'disabled' : 'default'];
  return (
    <TouchableOpacityBox
      alignItems="center"
      justifyContent="center"
      borderRadius="br16"
      height={50}
      paddingHorizontal="spc20"
      disabled={isDisabled || isLoading}
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}>
      {isLoading ? (
        <ActivityIndicator color={buttonPreset.content} />
      ) : (
        <Text bold preset="paragraphMedium" color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
