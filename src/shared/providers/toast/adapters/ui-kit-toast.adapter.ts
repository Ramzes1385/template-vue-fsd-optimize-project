import type { ToastService } from '../toast.types'

// Пример:
//
// import { useUiKitToast } from '@your/ui-kit';

export function createUiKitToastAdapter(): ToastService {
  // Если твой UI kit даёт composable:
  //
  // const uiToast = useUiKitToast();

  return {
    success: ({ title, description, duration }) => {
      // uiToast.success({ title, description, duration });
      console.info('[success]', title, description, duration)
    },

    error: ({ title, description, duration }) => {
      // uiToast.error({ title, description, duration });
      console.error('[error]', title, description, duration)
    },

    warning: ({ title, description, duration }) => {
      // uiToast.warning({ title, description, duration });
      console.warn('[warning]', title, description, duration)
    },

    info: ({ title, description, duration }) => {
      // uiToast.info({ title, description, duration });
      console.info('[info]', title, description, duration)
    },
  }
}
