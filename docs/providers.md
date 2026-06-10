# Providers

В проекте есть два уровня providers:

```txt
app/providers
shared/providers
```

## app/providers

`app/providers` отвечает за инициализацию приложения и связывает нижние слои.

Структура:

```txt
src/app/providers/
  api/
  app/
  error/
  i18n/
  router/
  store/
```

`app` может импортировать:

```txt
pages
widgets
features
entities
shared
```

Поэтому app-level providers могут связывать разные части приложения.

## shared/providers

`shared/providers` содержит переиспользуемые инфраструктурные providers, которые не зависят от бизнес-логики.

Структура:

```txt
src/shared/providers/
  theme/
  ui-kit/
  toast/
  error-boundary/
  suspense-boundary/
```

`shared/providers` не должен импортировать:

```txt
@app
@pages
@widgets
@features
@entities
```

## App provider

Главный provider приложения может собирать shared providers.

Пример:

```vue
<script setup lang="ts">
import { ErrorBoundary } from '@shared/providers/error-boundary'
import { SuspenseBoundary } from '@shared/providers/suspense-boundary'
import { ThemeProvider } from '@shared/providers/theme'
import { ToastProvider } from '@shared/providers/toast'
import { UiKitProvider } from '@shared/providers/ui-kit'
</script>

<template>
  <UiKitProvider>
    <ThemeProvider>
      <ToastProvider>
        <ErrorBoundary>
          <SuspenseBoundary>
            <slot />
          </SuspenseBoundary>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  </UiKitProvider>
</template>
```

## API provider

App-level API initialization находится здесь:

```txt
src/app/providers/api/init-api.ts
```

Он отвечает за:

```txt
request interceptor
Authorization header
response error normalization
error reporting
```

`initApi()` вызывается один раз при bootstrap приложения после инициализации store.

## Store provider

Store provider отвечает за Pinia.

Пример:

```txt
src/app/providers/store/
  index.ts
```

`initStore(app)` должен быть вызван до `initApi()`, если `initApi()` использует stores.

## Router provider

Router находится здесь:

```txt
src/app/providers/router/
  index.ts
  routes.ts
```

Router подключается при bootstrap:

```ts
app.use(router)
```

## i18n provider

Создание i18n instance находится в:

```txt
src/app/providers/i18n/
```

Переводы, config и types находятся в:

```txt
src/shared/i18n/
```

Правило:

```txt
app/providers/i18n может собирать i18n
shared/i18n хранит переиспользуемые настройки и ресурсы
```

## Toast provider

Toast сделан через adapter.

Цель: не импортировать UI kit напрямую в `pages`, `widgets`, `features`, `entities`.

Разрешённое место для UI kit toast API:

```txt
src/shared/providers/toast/adapters/
```

Использование в коде:

```ts
import { useToast } from '@shared/providers/toast'

const toast = useToast()

toast.success({
  message: 'Saved',
})
```

Запрещено:

```ts
import { toast } from 'some-ui-kit'
```

## ErrorBoundary

`ErrorBoundary` отвечает только за отображение fallback UI и обработку ошибок.

Важно:

```txt
ErrorBoundary не должен автоматически вызывать toast
```

Причина: toast — это UX-решение конкретного сценария, а не универсальное поведение любой ошибки.

## SuspenseBoundary

`SuspenseBoundary` использует только loader из `shared/ui/loader`.

Правильно:

```ts
import { Loader } from '@shared/ui/loader'
```

Неправильно:

```ts
import { Loader } from 'some-ui-kit'
```

UI kit loader должен быть обёрнут в `shared/ui/loader`.

## UiKitProvider

`UiKitProvider` содержит app-level подключение внешнего UI kit.

Разрешено:

```txt
src/shared/providers/ui-kit/
```

Запрещено напрямую использовать UI kit в:

```txt
pages/
widgets/
features/
entities/
```

## ThemeProvider

`ThemeProvider` отвечает за тему приложения.

Он может использовать:

```txt
CSS variables
localStorage
document.documentElement
```

Но не должен зависеть от бизнес-сущностей или app-level router/session.

## Rules

- `app/providers` связывает приложение и нижние слои.
- `shared/providers` не импортирует верхние FSD-слои.
- UI kit разрешён только в специальных shared-зонах.
- Toast идёт через adapter.
- ErrorBoundary не вызывает toast автоматически.
- SuspenseBoundary использует только `@shared/ui/loader`.
- Store должен инициализироваться до API, если API использует store.
- Providers не должны превращаться в место бизнес-логики.
