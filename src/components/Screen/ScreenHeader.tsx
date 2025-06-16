import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Box, Icon, Text, TouchableOpacityBox } from '@components';

import { TScreenProps } from './types';

type TProps = Pick<TScreenProps, 'canGoBack' | 'title' | 'HeaderComponent'>;

export function ScreenHeader({ canGoBack, title, HeaderComponent }: TProps) {
  const navigation = useNavigation();

  const isVisibleLabelGoBack = !title && !HeaderComponent;

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
          alignItems="center"
          mr="spc12">
          <Icon name="arrowLeft" color="primary" />
          {isVisibleLabelGoBack && (
            <Text preset="paragraphMedium" semiBold ml="spc12">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {HeaderComponent}

      {title && (
        <Text preset="headingSmall" bold>
          {title}
        </Text>
      )}
      {title && <Box width={24} />}
    </Box>
  );
}
