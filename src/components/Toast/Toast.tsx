import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

import { useToast, useToastActions } from '@services';

import { ToastUI } from './components/ToastUI';

const DEFAULT_DURATION = 4000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastActions();
  const opacityEffect = useRef(new Animated.Value(0)).current;

  const runEnteringAnimation = useCallback(() => {
    Animated.timing(opacityEffect, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacityEffect]);

  const runExitingAnimation = useCallback(
    (callback: Animated.EndCallback) => {
      Animated.timing(opacityEffect, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(callback);
    },
    [opacityEffect],
  );

  useEffect(() => {
    if (toast) {
      runEnteringAnimation();

      const timer = setTimeout(() => {
        runExitingAnimation(hideToast);
      }, toast?.duration || DEFAULT_DURATION);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hideToast, toast, runEnteringAnimation, runExitingAnimation]);

  if (!toast) return null;

  /* return (
    <Animated.View style={[$wrapper, { opacity: opacityEffect }]}>
      <ToastUI toast={toast} />
    </Animated.View>
  ); */
  return <ToastUI toast={toast} />;
}

const $wrapper: StyleProp<ViewStyle> = {
  position: 'absolute',
  alignSelf: 'center',
};
