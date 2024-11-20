import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAppSafeArea } from '../../hooks/useAppSafeArea';
import { useAppTheme } from '../../hooks/useAppTheme';
import { Box, TouchableOpacityBox } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

import { ScrollViewContainer, ViewContainer } from './Containers';

type TProps = {
  children: ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
};

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
}: TProps) {
  const { top, bottom } = useAppSafeArea();
  const { colors } = useAppTheme();
  const navigation = useNavigation();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          paddingHorizontal="spc24"
          style={{
            paddingTop: Math.max(top),
            paddingBottom: Math.max(bottom),
          }}>
          {canGoBack && (
            <TouchableOpacityBox
              onPress={navigation.goBack}
              mb="spc24"
              flexDirection="row"
              alignItems="center">
              <Icon name="arrowLeft" color="primary" />
              <Text preset="paragraphMedium" semiBold ml="spc12">
                Voltar
              </Text>
            </TouchableOpacityBox>
          )}
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}
