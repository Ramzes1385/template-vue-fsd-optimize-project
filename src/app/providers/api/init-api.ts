import { AxiosHeaders } from 'axios'

import { useSessionStore } from '@entities/session'
import { httpClient, normalizeApiError } from '@shared/api'
import { reportError } from '@shared/lib/error'

let isApiInitialized = false

export function initApi() {
  if (isApiInitialized) {
    return
  }

  isApiInitialized = true

  httpClient.interceptors.request.use(config => {
    const session = useSessionStore()

    if (session.accessToken) {
      config.headers = AxiosHeaders.from(config.headers)

      config.headers.set('Authorization', `Bearer ${session.accessToken}`)
    }

    return config
  })

  httpClient.interceptors.response.use(
    response => response,
    error => {
      const appError = normalizeApiError(error)

      reportError(appError)

      return Promise.reject(appError)
    },
  )
}
