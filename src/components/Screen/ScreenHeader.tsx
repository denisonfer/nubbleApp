import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Box, Icon, Text, TouchableOpacityBox } from '@components';

import { TScreenProps } from './types';

type TProps = Pick<TScreenProps, 'canGoBack' | 'title'>;

export function ScreenHeader({ canGoBack, title }: TProps) {
  const navigation = useNavigation();

  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      mb="spc24">
      {canGoBack && (
        <TouchableOpacityBox
          onPress={navigation.goBack}
          flexDirection="row"
          alignItems="center">
          <Icon name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" semiBold ml="spc12">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {title && (
        <Text preset="headingSmall" bold>
          {title}
        </Text>
      )}
      {title && <Box width={24} />}
    </Box>
  );
}
