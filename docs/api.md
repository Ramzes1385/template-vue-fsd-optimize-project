# API

Проект использует Axios для HTTP-запросов.

API layer разделён на два уровня:

```txt
shared/api          → базовый HTTP client и общие типы
app/providers/api   → app-level инициализация Axios
```

## Structure

```txt
src/shared/api/
  api-errors.ts
  http-client.ts
  types.ts
  index.ts

src/app/providers/api/
  init-api.ts
  index.ts
```

## shared/api

`shared/api` содержит только инфраструктуру, которая не зависит от бизнес-логики.

Разрешено:

```ts
import { env } from '@shared/config/env'
import type { AppError } from '@shared/lib/error'
```

Запрещено:

```ts
import { useSessionStore } from '@entities/session'
import { router } from '@app/providers/router'
```

`shared/api` не должен знать про session, router, pages, features или app-level логику.

## httpClient

Файл:

```txt
src/shared/api/http-client.ts
```

Пример:

```ts
import axios from 'axios'

import { env } from '@shared/config/env'

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## API errors

Файл:

```txt
src/shared/api/api-errors.ts
```

`normalizeApiError` приводит неизвестную ошибку к общему формату `AppError`.

Пример:

```ts
import axios from 'axios'

import type { AppError } from '@shared/lib/error'

type ApiErrorResponse = {
  message?: string
  error?: string
  statusCode?: number
}

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status
    const data = error.response?.data

    return {
      name: 'ApiError',
      message: data?.message ?? data?.error ?? error.message ?? 'API request failed',
      source: 'api',
      originalError: error,
      stack: error.stack,
      meta: {
        status,
        statusCode: data?.statusCode,
        url: error.config?.url,
        method: error.config?.method,
      },
    }
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      source: 'api',
      originalError: error,
      stack: error.stack,
    }
  }

  return {
    name: 'UnknownApiError',
    message: 'Unknown API error',
    source: 'api',
    originalError: error,
  }
}
```

## API types

Файл:

```txt
src/shared/api/types.ts
```

Пример:

```ts
export type ApiResponse<T> = {
  data: T
}

export type ApiPaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ApiListResponse<T> = {
  data: T[]
  meta: ApiPaginationMeta
}
```

## Public API

Файл:

```txt
src/shared/api/index.ts
```

Пример:

```ts
export { httpClient } from './http-client'
export { normalizeApiError } from './api-errors'

export type { ApiResponse, ApiListResponse, ApiPaginationMeta } from './types'
```

## app/providers/api

Файл:

```txt
src/app/providers/api/init-api.ts
```

`app/providers/api` связывает `shared/api` с app-level логикой:

```txt
access token
request interceptor
response error reporting
```

Пример:

```ts
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

  httpClient.interceptors.request.use((config) => {
    const session = useSessionStore()

    if (session.accessToken) {
      config.headers = AxiosHeaders.from(config.headers)

      config.headers.set('Authorization', `Bearer ${session.accessToken}`)
    }

    return config
  })

  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const appError = normalizeApiError(error)

      reportError(appError)

      return Promise.reject(appError)
    },
  )
}
```

## Initialization

`initApi()` вызывается один раз при старте приложения после инициализации store.

Пример:

```ts
import { createApp } from 'vue'

import { App } from '@app/entrypoint'
import { initApi } from '@app/providers/api'
import { initStore } from '@app/providers/store'

const app = createApp(App)

initStore(app)
initApi()

app.mount('#app')
```

## Requests in entities

Запросы конкретной бизнес-сущности лежат в `entities/*/api`.

Пример:

```txt
src/entities/user/
  api/
    user.api.ts
  model/
    user.types.ts
  index.ts
```

Пример запроса:

```ts
import { httpClient } from '@shared/api'

import type { ApiResponse } from '@shared/api'
import type { User } from '../model/user.types'

export async function getUser(userId: string): Promise<User> {
  const response = await httpClient.get<ApiResponse<User>>(`/users/${userId}`)

  return response.data.data
}
```

## Requests in features

Если запрос относится не к сущности, а к пользовательскому сценарию, он может лежать в `features/*/api`.

Пример:

```txt
src/features/auth-by-email/
  api/
    auth-by-email.api.ts
  model/
  ui/
  index.ts
```

## Rules

- `shared/api` содержит только базовый Axios client, API types и error normalization.
- `shared/api` не импортирует `app`, `pages`, `widgets`, `features`, `entities`.
- Session token добавляется только в `app/providers/api/init-api.ts`.
- Error reporting подключается только в `app/providers/api/init-api.ts`.
- `entities/*/api` используют `@shared/api`.
- `features/*/api` используют `@shared/api`.
- Нельзя импортировать API client из `@app/providers/api` в `entities` или `features`.
- `initApi()` вызывается один раз при bootstrap приложения.
