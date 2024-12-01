export type TToastType = 'success' | 'error';
export type TToastPosition = 'top' | 'bottom';

export type TToast = {
  message: string;
  type: TToastType;
  position?: TToastPosition;
  duration?: number;
  action?: {
    title: string;
    onPress: () => void;
  };
};

export type TToastService = {
  toast: TToast | null;
  showToast: (toast: TToast) => void;
  hideToast: () => void;
};
