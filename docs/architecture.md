# Architecture

Проект построен на Feature-Sliced Design.

## Layers

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

## Dependency rule

Нижний слой не должен импортировать верхний.

```txt
app      → pages, widgets, features, entities, shared
pages    → widgets, features, entities, shared
widgets  → features, entities, shared
features → entities, shared
entities → shared
shared   → только shared
```

## app

Слой инициализации приложения.

Примеры:

```txt
src/app/
  entrypoint/
  providers/
    api/
    app/
    error/
    i18n/
    router/
    store/
  config/
```

`app` может связывать разные слои между собой.

Например:

```txt
app/providers/api/init-api.ts
```

может использовать:

```txt
@entities/session
@shared/api
@shared/lib/error
```

## pages

Страницы приложения.

Пример:

```txt
src/pages/home/
  ui/
    HomePage.vue
  index.ts
```

Страницы экспортируются через public API:

```ts
export { default as HomePage } from './ui/HomePage.vue'
```

В router импортируем страницу только через public API:

```ts
component: () => import('@pages/home').then((module) => module.HomePage)
```

## widgets

Крупные самостоятельные блоки интерфейса.

Пример:

```txt
src/widgets/header/
  ui/
  model/
  index.ts
```

`widgets` могут использовать `features`, `entities`, `shared`.

## features

Пользовательские сценарии.

Пример:

```txt
src/features/auth-by-email/
  api/
  model/
  ui/
  index.ts
```

`features` могут использовать `entities` и `shared`.

## entities

Бизнес-сущности.

Пример:

```txt
src/entities/user/
  api/
  model/
  ui/
  index.ts
```

`entities` могут использовать только `shared`.

## shared

Переиспользуемая инфраструктура без бизнес-зависимостей.

Пример:

```txt
src/shared/
  api/
  config/
  i18n/
  lib/
  providers/
  styles/
  ui/
```

`shared` не должен импортировать `app`, `pages`, `widgets`, `features`, `entities`.

## Public API

Импортировать slice нужно через `index.ts`.

Правильно:

```ts
import { UserAvatar } from '@entities/user'
```

Неправильно:

```ts
import UserAvatar from '@entities/user/ui/UserAvatar.vue'
```

## UI Kit

Внешний UI kit нельзя импортировать напрямую в:

```txt
pages/
widgets/
features/
entities/
```

Разрешённые места:

```txt
shared/ui/
shared/providers/ui-kit/
shared/providers/toast/adapters/
shared/styles/vendors/
```

Компоненты из UI kit должны быть обёрнуты в `shared/ui`.

## API

`shared/api` содержит только базовую инфраструктуру:

```txt
shared/api/
  http-client.ts
  api-errors.ts
  types.ts
  index.ts
```

`shared/api` не знает про session, router и app-level логику.

App-level настройка Axios находится здесь:

```txt
app/providers/api/init-api.ts
```

Там подключаются:

- access token
- request interceptors
- response error reporting

## Styles

Глобальные стили находятся только в:

```txt
src/shared/styles/
```

Единая точка входа:

```txt
src/shared/styles/index.scss
```

Подключение выполняется один раз в entrypoint приложения.

## Tests

Unit-тесты:

```txt
Vitest
```

E2E-тесты:

```txt
Playwright
```

Template может не иметь unit-тестов, поэтому `passWithNoTests: true`.
