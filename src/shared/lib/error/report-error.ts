import type { AppError } from './types'

export function reportError(error: AppError) {
  if (import.meta.env.DEV) {
    console.error(`[${error.source}] ${error.name}: ${error.message}`, error)
  }

  // Здесь позже можно подключить Sentry, LogRocket, backend logging и т.д.
  //
  // Example:
  // Sentry.captureException(error.originalError ?? error);
}
