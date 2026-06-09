export type AppErrorSource =
  | 'vue'
  | 'window'
  | 'promise'
  | 'router'
  | 'api'
  | 'unknown';

export type AppError = {
  name: string;
  message: string;
  source: AppErrorSource;
  stack?: string;
  originalError?: unknown;
  meta?: Record<string, unknown>;
};
