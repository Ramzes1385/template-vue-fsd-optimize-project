import type { ToastService } from '../toast.types';

export function createDefaultToastAdapter(): ToastService {
  return {
    success: ({ title, description }) => {
      console.info('[success]', title, description);
    },

    error: ({ title, description }) => {
      console.error('[error]', title, description);
    },

    warning: ({ title, description }) => {
      console.warn('[warning]', title, description);
    },

    info: ({ title, description }) => {
      console.info('[info]', title, description);
    },
  };
}
