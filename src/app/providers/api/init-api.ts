import { useSessionStore } from '@entities/session';
import { httpClient, normalizeApiError } from '@shared/api';
import { reportError } from '@shared/lib/error';

export function initApi() {
  httpClient.interceptors.request.use((config) => {
    const session = useSessionStore();

    if (session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  });

  httpClient.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      reportError(normalizeApiError(error));

      return Promise.reject(error);
    },
  );
}
