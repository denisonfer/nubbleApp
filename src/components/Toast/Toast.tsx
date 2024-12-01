import React, { useEffect } from 'react';

import { useToast, useToastActions } from '@services';

import { ToastUI } from './components/ToastUI';

const DEFAULT_DURATION = 2000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastActions();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hideToast();
      }, toast?.duration || DEFAULT_DURATION);
    }
  }, [hideToast, toast]);

  if (!toast) return null;
  return <ToastUI toast={toast} />;
}
