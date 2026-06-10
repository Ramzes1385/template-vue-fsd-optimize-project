# Shared

`shared/` — это общий переиспользуемый код без бизнес-логики.

Код из `shared` может использоваться в любом слое проекта:

```txt
app
pages
widgets
features
entities
shared
```

Но сам `shared` не должен импортировать код из:

```txt
app/
pages/
widgets/
features/
entities/
```

## Структура

```txt
shared/
├─ api/
├─ assets/
├─ config/
├─ i18n/
├─ lib/
├─ providers/
├─ styles/
└─ ui/
```

## `api/`

Базовая работа с HTTP/API.

```txt
api/
├─ http-client.ts
├─ api-errors.ts
├─ types.ts
└─ index.ts
```

Здесь лежит:

```txt
- axios instance
- общие API-типы
- нормализация API-ошибок
```

Не кладём сюда API конкретной сущности.

Правильно:

```txt
entities/user/api/user.api.ts
features/auth-by-email/api/auth-by-email.api.ts
```

Неправильно:

```txt
shared/api/user.api.ts
shared/api/auth.api.ts
```

## `assets/`

Статические ресурсы.

```txt
assets/
├─ icons/
├─ images/
└─ fonts/
```

Здесь храним:

```txt
- иконки
- изображения
- локальные шрифты
```

## `config/`

Общие конфиги и константы.

```txt
config/
├─ env.ts
└─ routes.ts
```

Примеры:

```txt
- env variables
- route path constants
- общие app constants
```

В `routes.ts` храним только пути:

```ts
export const AppRoutes = {
  home: '/',
  login: '/login',
  profile: '/profile',
} as const
```

Vue Router routes должны лежать в:

```txt
app/providers/router/routes.ts
```

## `i18n/`

Переводы и настройки локализации.

```txt
i18n/
├─ locales/
│  ├─ en/
│  └─ ru/
├─ config.ts
├─ messages.ts
├─ types.ts
└─ index.ts
```

Здесь лежит:

```txt
- JSON-файлы переводов
- список поддерживаемых языков
- типы локалей
- messages для vue-i18n
```

Сам `createI18n()` находится в:

```txt
app/providers/i18n
```

Отдельный `shared/providers/i18n` не нужен.

## `lib/`

Чистые технические функции и helpers.

```txt
lib/
├─ error/
├─ date/
├─ string/
└─ storage/
```

Примеры:

```txt
- normalizeError
- reportError
- formatDate
- capitalize
- localStorage helpers
```

В `lib` не должно быть Vue-компонентов и бизнес-логики.

## `providers/`

Переиспользуемые технические Vue-обёртки.

```txt
providers/
├─ error-boundary/
├─ suspense-boundary/
├─ theme/
├─ toast/
└─ ui-kit/
```

Здесь лежит:

```txt
- ErrorBoundary
- SuspenseBoundary
- ThemeProvider
- ToastProvider
- UiKitProvider
```

Правило:

```txt
providers = оборачивают приложение или часть дерева компонентов
ui        = простые визуальные компоненты
```

## `providers/ui-kit`

`UiKitProvider` нужен для подключения глобального provider из внешнего UI kit.

Если UI kit не требует provider, файл остаётся passthrough:

```vue
<template>
  <slot />
</template>
```

Если UI kit требует provider, подключаем его только здесь:

```vue
<script setup lang="ts">
import { UiProvider } from '@your/ui-kit'
</script>

<template>
  <UiProvider>
    <slot />
  </UiProvider>
</template>
```

UI kit не должен подключаться напрямую в `pages`, `widgets`, `features`, `entities`.

## `providers/toast`

`ToastProvider` даёт единый интерфейс уведомлений для проекта.

Проект использует только:

```ts
import { useToast } from '@shared/providers/toast'

const toast = useToast()

toast.success({
  title: 'Saved',
})

toast.error({
  title: 'Error',
  description: 'Something went wrong',
})
```

Если toast есть во внешнем UI kit, он подключается через adapter:

```txt
providers/toast/adapters/ui-kit-toast.adapter.ts
```

`features`, `widgets`, `pages` не должны импортировать toast напрямую из UI kit.

Плохо:

```ts
import { toast } from '@your/ui-kit'
```

Хорошо:

```ts
import { useToast } from '@shared/providers/toast'
```

Если toast зависит от глобального UI kit provider, порядок должен быть такой:

```txt
ThemeProvider
  UiKitProvider
    ToastProvider
      ErrorBoundary
        SuspenseBoundary
          App
```

`ErrorBoundary` не должен автоматически показывать toast.
Он показывает fallback UI и логирует ошибку.

Toast показываем только там, где есть пользовательский контекст:

```txt
- форма сохранена
- логин не удался
- файл загружен
- не удалось загрузить список
```

## `providers/suspense-boundary`

`SuspenseBoundary` отвечает за fallback во время загрузки lazy/async компонентов.

Он не должен использовать loader из UI kit напрямую.

Правильно:

```txt
SuspenseBoundary
  использует shared/ui/loader
```

А уже `shared/ui/loader` может внутри использовать loader из UI kit.

## `styles/`

Общие SCSS-токены и helpers.

```txt
styles/
├─ _variables.scss
├─ _breakpoints.scss
├─ _mixins.scss
└─ vendors/
   └─ ui-kit.scss
```

Здесь храним:

```txt
- CSS variables
- SCSS variables
- breakpoints
- mixins
- глобальные overrides для внешнего UI kit
```

Глобальные стили приложения лежат в:

```txt
shared/styles/
```

## `styles/vendors/ui-kit.scss`

Здесь лежат глобальные style overrides для внешнего UI kit.

Используем только если нельзя решить стилизацию через:

```txt
1. CSS variables
2. props UI kit
3. wrapper-компонент в shared/ui
```

Не нужно разбрасывать override-стили по `features`, `widgets`, `pages`.

## `ui/`

Простые переиспользуемые UI-компоненты и wrapper-компоненты над внешним UI kit.

```txt
ui/
├─ button/
├─ input/
├─ modal/
├─ loader/
├─ icon/
├─ spinner/
├─ select/
├─ checkbox/
└─ tooltip/
```

Примеры:

```txt
Button
Input
Modal
Loader
Icon
Spinner
Tooltip
```

`ui` не должен знать бизнес-логику.

Хорошо:

```txt
shared/ui/button/Button.vue
shared/ui/loader/Loader.vue
```

Плохо:

```txt
shared/ui/UserProfileCard.vue
shared/ui/LoginForm.vue
```

Такие компоненты должны лежать в:

```txt
widgets/
features/
entities/
```

## UI kit integration

Внешний UI kit нельзя использовать напрямую в:

```txt
pages/
widgets/
features/
entities/
```

Плохо:

```ts
import { UiButton } from '@your/ui-kit'
import { UiInput } from '@your/ui-kit'
```

Хорошо:

```ts
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
```

`shared/ui` — это адаптер над UI kit.

Проект работает только с нашими компонентами:

```txt
shared/ui/button
shared/ui/input
shared/ui/modal
shared/ui/loader
```

А внутри этих компонентов можно использовать любую внешнюю библиотеку.

Если UI kit поменяется, нужно будет изменить только `shared/ui`, а не весь проект.

## Где можно импортировать UI kit напрямую

Разрешено:

```txt
shared/ui/*
shared/providers/ui-kit
shared/providers/toast/adapters/*
shared/styles/vendors/ui-kit.scss
```

Запрещено:

```txt
pages/
widgets/
features/
entities/
```

## Loader из UI kit

Если в UI kit есть loader, подключаем его внутри:

```txt
shared/ui/loader/Loader.vue
```

`SuspenseBoundary` должен использовать только:

```ts
import { Loader } from '@shared/ui/loader'
```

Так можно заменить loader без изменения `SuspenseBoundary`.

## Public API

Каждая папка должна экспортировать наружу только нужное через `index.ts`.

Хорошо:

```ts
import { Button } from '@shared/ui/button'
import { Loader } from '@shared/ui/loader'
import { useToast } from '@shared/providers/toast'
import { httpClient } from '@shared/api'
```

Плохо:

```ts
import Button from '@shared/ui/button/Button.vue'
import Loader from '@shared/ui/loader/Loader.vue'
import { httpClient } from '@shared/api/http-client'
```

## Главное правило

`shared` — это фундамент проекта.

Сюда можно класть только то, что:

```txt
- не зависит от бизнес-домена
- может переиспользоваться в разных местах
- не импортирует верхние FSD-слои
- не знает про конкретные pages/features/entities
```

Если код связан с пользователем, заказом, авторизацией, профилем или другой бизнес-сущностью — ему не место в `shared`.
