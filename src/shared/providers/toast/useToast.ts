import { inject } from 'vue';

import type { ToastService } from './toast.types';

export const TOAST_PROVIDER_KEY = Symbol('TOAST_PROVIDER_KEY');

export function useToast() {
  const toast = inject<ToastService>(TOAST_PROVIDER_KEY);

  if (!toast) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return toast;
}
