import { useToastStore } from '@stores';

import { TToastService } from '../toastTypes';

export function useToast(): TToastService['toast'] {
  const toast = useToastStore(state => state.toast);

  return toast;
}

export function useToastActions(): Pick<
  TToastService,
  'showToast' | 'hideToast'
> {
  const showToast = useToastStore(state => state.showToast);
  const hideToast = useToastStore(state => state.hideToast);

  return { showToast, hideToast };
}
