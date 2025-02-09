import React from 'react';

import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { TouchableOpacityBox } from '../Box/Box';
import { Text } from '../Text/Text';

import { buttonPresetMapper, TButtonProps } from './types';

export function Button({
  title,
  isLoading = false,
  preset = 'primary',
  disabled = false,
  ...touchableOpacityBoxProps
}: TButtonProps) {
  const buttonPreset =
    buttonPresetMapper[preset][disabled ? 'disabled' : 'default'];
  return (
    <TouchableOpacityBox
      testID="button"
      alignItems="center"
      justifyContent="center"
      borderRadius="br16"
      height={50}
      paddingHorizontal="spc20"
      disabled={disabled || isLoading}
      {...buttonPreset.container}
      {...touchableOpacityBoxProps}>
      {isLoading ? (
        <ActivityIndicator
          testID="activity-indicator"
          color={buttonPreset.content}
        />
      ) : (
        <Text bold preset="paragraphMedium" color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
