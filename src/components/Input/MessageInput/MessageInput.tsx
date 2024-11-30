import React from 'react';
import { StyleProp, TextInput, TextInputProps, ViewStyle } from 'react-native';

import { useAppTheme } from '@hooks';

import { Box, TBoxProps } from '../../Box/Box';
import { Text } from '../../Text/Text';

type TProps = TextInputProps & {
  onPressSend: () => void;
};

export function MessageInput({
  value,
  onPressSend,
  ...rnTextInputProps
}: TProps) {
  const { colors } = useAppTheme();
  const isDisabledSend = value?.trim().length === 0;
  return (
    <Box {...$inputContainer}>
      <TextInput
        placeholderTextColor={colors.gray1}
        multiline
        value={value}
        {...rnTextInputProps}
        style={$input}
      />
      <Text
        onPress={isDisabledSend ? undefined : onPressSend}
        ml="spc12"
        bold
        color={isDisabledSend ? 'gray1' : 'primary'}>
        Enviar
      </Text>
    </Box>
  );
}

const $inputContainer: TBoxProps = {
  flexDirection: 'row',
  backgroundColor: 'gray5',
  alignItems: 'center',
  paddingHorizontal: 'spc16',
  height: 50,
};

const $input: StyleProp<ViewStyle> = {
  flex: 1,
  padding: 0,
};
