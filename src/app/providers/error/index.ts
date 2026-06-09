import type { App } from 'vue'
import type { Router } from 'vue-router'

import { normalizeError, reportError } from '@/shared/lib/error'

type InitErrorProviderOptions = {
  app: App
  router?: Router
}

export function initErrorProvider(options: InitErrorProviderOptions) {
  const { app, router } = options

  app.config.errorHandler = (error, instance, info) => {
    reportError(
      normalizeError(error, {
        source: 'vue',
      }),
    )

    if (import.meta.env.DEV) {
      console.error('Vue error info:', info)
      console.error('Vue component instance:', instance)
    }
  }

  window.addEventListener('error', (event) => {
    reportError(
      normalizeError(event.error ?? event.message, {
        source: 'window',
      }),
    )
  })

  window.addEventListener('unhandledrejection', (event) => {
    reportError(
      normalizeError(event.reason, {
        source: 'promise',
      }),
    )
  })

  router?.onError((error) => {
    reportError(
      normalizeError(error, {
        source: 'router',
      }),
    )
  })
}
