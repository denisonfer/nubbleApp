import { create } from 'zustand';

import { TToast, TToastService } from '@services';

export const useToastStore = create<TToastService>(set => ({
  toast: null,
  showToast: (toast: TToast) => set({ toast }),
  hideToast: () => set({ toast: null }),
}));
