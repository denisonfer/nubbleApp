/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Dimensions } from 'react-native';

import { TToast, TToastPosition, TToastType } from '@services';

import { TIconProps } from '@components';
import { $shadowProps } from '@theme';

import { Box, TBoxProps } from '../../Box/Box';
import { Icon } from '../../Icon/Icon';
import { Text, TTextProps } from '../../Text/Text';

type TProps = {
  toast: TToast;
};

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;
export function ToastUI({ toast }: TProps) {
  const position: TToastPosition = toast.position || 'bottom';
  return (
    <Box {...$wrapper} style={[{ [position]: 100 }, $shadowProps]}>
      <Icon {...iconMapper[toast.type]} />
      <Text {...$text} preset="paragraphMedium" bold ml="spc12">
        {toast.message}
      </Text>
    </Box>
  );
}

const iconMapper: Record<TToastType, TIconProps> = {
  success: {
    name: 'checkRound',
    color: 'greenSuccess',
  },
  error: {
    name: 'errorRound',
    color: 'redError',
  },
};

const $wrapper: TBoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: 'br16',
  backgroundColor: 'gray5',
  paddingHorizontal: 'spc24',
  paddingVertical: 'spc16',
  maxWidth: MAX_WIDTH,
  position: 'absolute',
  alignSelf: 'center',
};

const $text: TTextProps = {
  style: { flexShrink: 1 },
};
