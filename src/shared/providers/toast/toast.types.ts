export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastOptions = {
  title: string;
  description?: string;
  duration?: number;
};

export type ToastService = {
  success: (options: ToastOptions) => void;
  error: (options: ToastOptions) => void;
  warning: (options: ToastOptions) => void;
  info: (options: ToastOptions) => void;
};
