import type { AppError, AppErrorSource } from './types';

type NormalizeErrorOptions = {
  source?: AppErrorSource;
};

export function normalizeError(
  error: unknown,
  options: NormalizeErrorOptions = {},
): AppError {
  const source = options.source ?? 'unknown';

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      source,
      originalError: error,
    };
  }

  if (typeof error === 'string') {
    return {
      name: 'Error',
      message: error,
      source,
      originalError: error,
    };
  }

  return {
    name: 'UnknownError',
    message: 'Unknown error',
    source,
    originalError: error,
  };
}
