# Environment

Переменные окружения используются для публичной конфигурации frontend-приложения.

## Files

```txt
.env.example
src/vite-env.d.ts
src/shared/config/env.ts
src/shared/config/index.ts
```

## .env.example

Пример:

```env
VITE_API_BASE_URL=http://localhost:3000
```

`.env.example` должен содержать все переменные, которые нужны проекту для запуска.

## VITE\_ prefix

В Vite клиенту доступны только переменные с префиксом `VITE_`.

Правильно:

```env
VITE_API_BASE_URL=https://api.example.com
```

Неправильно:

```env
API_SECRET_KEY=secret
VITE_PRIVATE_TOKEN=secret
```

Все `VITE_*` переменные попадают в клиентский bundle, поэтому там нельзя хранить секреты.

## Typing

Типизация переменных находится в:

```txt
src/vite-env.d.ts
```

Пример:

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## Runtime config wrapper

Доступ к env должен идти через:

```txt
src/shared/config/env.ts
```

Пример:

```ts
const getRequiredEnv = (key: keyof ImportMetaEnv): string => {
  const value = import.meta.env[key]

  if (!value) {
    throw new Error(`Missing required env variable: ${key}`)
  }

  return value
}

export const env = {
  apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),

  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
```

## Usage

Правильно:

```ts
import { env } from '@shared/config/env'

console.log(env.apiBaseUrl)
```

Неправильно:

```ts
console.log(import.meta.env.VITE_API_BASE_URL)
```

`import.meta.env` не должен расползаться по проекту.

## API base URL

Axios client использует env:

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

## Rules

- Все публичные env-переменные начинаются с `VITE_`.
- Все env-переменные описаны в `.env.example`.
- Все env-переменные типизированы в `src/vite-env.d.ts`.
- В приложении используется `@shared/config/env`, а не прямой `import.meta.env`.
- Секреты нельзя хранить в frontend env.
