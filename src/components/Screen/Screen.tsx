import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useAppSafeArea } from '@hooks';

import { useAppTheme } from '../../hooks/useAppTheme';
import { Box } from '../Box/Box';

import { ScrollViewContainer, ViewContainer } from './Containers';
import { ScreenHeader } from './ScreenHeader';
import { TScreenProps } from './types';

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
  title,
  style,
  HeaderComponent,
  ...tBoxProps
}: TScreenProps) {
  const { colors } = useAppTheme();
  const { top, bottom } = useAppSafeArea();

  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      style={$keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Container backgroundColor={colors.background}>
        <Box
          style={[
            {
              paddingTop: Math.max(top),
              paddingBottom: Math.max(bottom),
            },
            style,
          ]}
          {...tBoxProps}>
          <ScreenHeader
            canGoBack={canGoBack}
            title={title}
            HeaderComponent={HeaderComponent}
          />
          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  );
}

const $keyboardAvoidingView: StyleProp<ViewStyle> = {
  flex: 1,
};
