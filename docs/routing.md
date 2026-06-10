# Routing

Router находится в `app/providers/router`.

Страницы находятся в `pages/*`.

## Structure

```txt
src/
  app/
    providers/
      router/
        index.ts
        routes.ts

  shared/
    config/
      routes.ts

  pages/
    home/
      ui/
        HomePage.vue
      index.ts
```

## Route paths

Пути маршрутов хранятся в `shared/config/routes.ts`.

Пример:

```ts
export const AppRoutePath = {
  home: '/',
  login: '/login',
  profile: '/profile',
} as const

export type AppRouteName = keyof typeof AppRoutePath
export type AppRoutePathValue = (typeof AppRoutePath)[AppRouteName]
```

`shared/config/routes.ts` не должен импортировать router, pages или app.

## Router config

Маршруты собираются в:

```txt
src/app/providers/router/routes.ts
```

Пример:

```ts
import type { RouteRecordRaw } from 'vue-router'

import { AppRoutePath } from '@shared/config/routes'

export const routes: RouteRecordRaw[] = [
  {
    path: AppRoutePath.home,
    name: 'home',
    component: () => import('@pages/home').then((module) => module.HomePage),
  },
  {
    path: AppRoutePath.login,
    name: 'login',
    component: () => import('@pages/login').then((module) => module.LoginPage),
  },
  {
    path: AppRoutePath.profile,
    name: 'profile',
    component: () => import('@pages/profile').then((module) => module.ProfilePage),
  },
]
```

## Router instance

Файл:

```txt
src/app/providers/router/index.ts
```

Пример:

```ts
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from './routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
```

## Page public API

Каждая страница должна экспортироваться через `index.ts`.

Пример:

```txt
src/pages/home/
  ui/
    HomePage.vue
  index.ts
```

```ts
export { default as HomePage } from './ui/HomePage.vue'
```

## Lazy imports

В router используем lazy imports через public API.

Правильно:

```ts
component: () => import('@pages/home').then((module) => module.HomePage)
```

Неправильно:

```ts
component: () => import('@pages/home/ui/HomePage.vue')
```

Deep imports из page slice запрещены.

## Usage in app

Router подключается при bootstrap приложения.

Пример:

```ts
import { createApp } from 'vue'

import { App } from '@app/entrypoint'
import { router } from '@app/providers/router'
import { initApi } from '@app/providers/api'
import { initStore } from '@app/providers/store'

const app = createApp(App)

initStore(app)
initApi()

app.use(router)

app.mount('#app')
```

## RouterView

В корневом компоненте должен быть `RouterView`.

Пример:

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
```

## Rules

- Router instance живёт только в `app/providers/router`.
- Пути маршрутов лежат в `shared/config/routes.ts`.
- `shared/config/routes.ts` не импортирует router и pages.
- Страницы экспортируются через public API.
- В `routes.ts` запрещены deep imports страниц.
- `features`, `entities`, `shared` не импортируют router из `app`.
- Навигационные helpers, если нужны, лучше выносить отдельно и не тащить `router` в нижние слои.
