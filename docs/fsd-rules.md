# FSD Rules

Документ фиксирует правила Feature-Sliced Design для проекта.

## Layers

Проект использует слои:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

## Dependency direction

Импорты разрешены только сверху вниз:

```txt
app      → pages, widgets, features, entities, shared
pages    → widgets, features, entities, shared
widgets  → features, entities, shared
features → entities, shared
entities → shared
shared   → только shared
```

## shared

`shared` — самый нижний слой.

Разрешено:

```ts
import { env } from '@shared/config/env'
import { httpClient } from '@shared/api'
```

Запрещено:

```ts
import { useSessionStore } from '@entities/session'
import { router } from '@app/providers/router'
import { AuthByEmailForm } from '@features/auth-by-email'
```

`shared` не должен знать о бизнес-сущностях, фичах, страницах и приложении.

## entities

`entities` могут импортировать только `shared`.

Разрешено:

```ts
import { httpClient } from '@shared/api'
```

Запрещено:

```ts
import { login } from '@features/auth-by-email'
import { router } from '@app/providers/router'
```

Пример структуры:

```txt
src/entities/user/
  api/
  model/
  ui/
  index.ts
```

## features

`features` могут импортировать `entities` и `shared`.

Разрешено:

```ts
import { useSessionStore } from '@entities/session'
import { httpClient } from '@shared/api'
```

Запрещено:

```ts
import { Header } from '@widgets/header'
import { router } from '@app/providers/router'
```

Пример структуры:

```txt
src/features/auth-by-email/
  api/
  model/
  ui/
  index.ts
```

## widgets

`widgets` могут импортировать `features`, `entities`, `shared`.

Разрешено:

```ts
import { LogoutButton } from '@features/logout'
import { UserAvatar } from '@entities/user'
```

Запрещено:

```ts
import { router } from '@app/providers/router'
```

## pages

`pages` могут импортировать `widgets`, `features`, `entities`, `shared`.

Разрешено:

```ts
import { AuthByEmailForm } from '@features/auth-by-email'
```

Запрещено:

```ts
import { initApi } from '@app/providers/api'
```

## app

`app` — верхний слой.

Он может связывать нижние слои между собой.

Пример:

```ts
import { useSessionStore } from '@entities/session'
import { httpClient } from '@shared/api'
```

Это допустимо в `app/providers/api/init-api.ts`, потому что `app` отвечает за инициализацию приложения.

## Public API

Каждый slice должен иметь `index.ts`.

Правильно:

```ts
import { UserAvatar } from '@entities/user'
import { AuthByEmailForm } from '@features/auth-by-email'
```

Неправильно:

```ts
import UserAvatar from '@entities/user/ui/UserAvatar.vue'
import { useAuthByEmailStore } from '@features/auth-by-email/model/auth-by-email.store'
```

Deep imports между slices запрещены.

## Внутренние импорты slice

Внутри одного slice используем relative imports.

Правильно:

```ts
import type { User } from '../model/user.types'
```

Неправильно:

```ts
import type { User } from '@entities/user/model/user.types'
```

Alias используется для внешнего public API, а не для внутренних связей slice.

## UI Kit

Внешний UI kit нельзя импортировать напрямую в:

```txt
pages/
widgets/
features/
entities/
```

Запрещено:

```ts
import { Button } from 'some-ui-kit'
```

Разрешённые зоны для UI kit:

```txt
src/shared/ui/
src/shared/providers/ui-kit/
src/shared/providers/toast/adapters/
src/shared/styles/vendors/
```

Правильно:

```ts
import { Button } from '@shared/ui/button'
```

## API

`shared/api` содержит только базовую инфраструктуру:

```txt
src/shared/api/
  http-client.ts
  api-errors.ts
  types.ts
  index.ts
```

`shared/api` не должен импортировать:

```txt
@app
@pages
@widgets
@features
@entities
```

App-level настройка API находится в:

```txt
src/app/providers/api/init-api.ts
```

Там можно подключать session token, interceptors и error reporting.

## ESLint

Архитектурные правила защищаются через ESLint-конфиги:

```txt
build/eslint/
  fsd-boundaries.ts
  ui-kit-boundaries.ts
```

Проверка:

```bash
npm run lint
```
