import axios from 'axios';

import type { AppError } from '@shared/lib/error';

type ApiErrorResponse = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    return {
      name: 'ApiError',
      message:
        data?.message ??
        data?.error ??
        error.message ??
        'API request failed',
      source: 'api',
      originalError: error,
      stack: error.stack,
      meta: {
        status,
        url: error.config?.url,
        method: error.config?.method,
      },
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      source: 'api',
      stack: error.stack,
      originalError: error,
    };
  }

  return {
    name: 'ApiError',
    message: 'Unknown API error',
    source: 'api',
    originalError: error,
  };
}
