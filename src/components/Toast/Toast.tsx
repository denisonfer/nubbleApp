import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { TToastPosition, useToast, useToastServices } from '@services';

import { ToastUI } from './components/ToastUI';

const DEFAULT_DURATION = 4000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastServices();
  const opacityEffect = useRef(new Animated.Value(0)).current;

  const position: TToastPosition = toast?.position || 'bottom';

  const fadeAnimation = useCallback(
    (value: number, callback?: Animated.EndCallback) => {
      Animated.timing(opacityEffect, {
        toValue: value,
        duration: 1000,
        useNativeDriver: true,
      }).start(callback);
    },
    [opacityEffect],
  );

  const runEnteringAnimation = useCallback(() => {
    fadeAnimation(1);
  }, [fadeAnimation]);

  const runExitingAnimation = useCallback(() => {
    fadeAnimation(0, hideToast);
  }, [fadeAnimation, hideToast]);

  useEffect(() => {
    if (toast) {
      runEnteringAnimation();

      const timer = setTimeout(() => {
        runExitingAnimation();
      }, toast?.duration || DEFAULT_DURATION);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hideToast, toast, runEnteringAnimation, runExitingAnimation]);

  if (!toast) return null;

  return (
    <Animated.View style={$wrapper(opacityEffect, position)}>
      <ToastUI toast={toast} />
    </Animated.View>
  );
}

const $wrapper = (
  opacity: Animated.Value,
  position: TToastPosition,
): StyleProp<ViewStyle> => ({
  position: 'absolute',
  alignSelf: 'center',
  [position]: 100,
  opacity,
});
