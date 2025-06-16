import React, { useRef } from 'react';
import { Pressable, TextInput, TextStyle } from 'react-native';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Box, TBoxProps } from '../Box/Box';
import { $fontFamilies, $fontSizes, Text } from '../Text/Text';

import { TInputProps } from './types';

export function Input({
  label,
  errorMessage,
  RightComponent,
  LeftComponent,
  boxProps,
  ...textInputProps
}: TInputProps) {
  const inputRef = useRef<TextInput>(null);
  const { colors } = useAppTheme();

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const $InputContainer: TBoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'gray4',
    borderRadius: 'br12',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 'spc16',
    height: 50,
  };

  return (
    <Box flex={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text preset="paragraphMedium" mb="spc4">
            {label}
          </Text>
        )}
        <Box {...$InputContainer}>
          {LeftComponent && (
            <Box height={20} width={20} mr="spc16">
              {LeftComponent}
            </Box>
          )}
          <TextInput
            ref={inputRef}
            placeholderTextColor={colors.gray2}
            autoCapitalize="none"
            style={[$RNTextInput, textInputProps.style]}
            {...textInputProps}
          />

          {RightComponent && (
            <Box height={20} width={20} ml="spc16">
              {RightComponent}
            </Box>
          )}
        </Box>

        {errorMessage && (
          <Text preset="paragraphSmall" color="error" bold>
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

const $RNTextInput: TextStyle = {
  flex: 1,
  padding: 0,
  fontFamily: $fontFamilies.regular,
  ...$fontSizes.paragraphMedium,
};
