# Build

Папка `build/` хранит конфигурацию проекта: сборка, оптимизация, dev-server, proxy, SSR и тесты.

Важно: `build/` — это **не результат сборки**.
Готовая production-сборка создаётся в `dist/`.

## Структура

```txt
build/
├─ vite.ts
├─ aliases.ts
├─ chunks.ts
├─ plugins.ts
├─ optimization.ts
├─ server/
│  ├─ index.ts
│  ├─ proxy.ts
│  ├─ preview.ts
│  ├─ ssr.ts
│  └─ headers.ts
├─ testing/
│  ├─ index.ts
│  ├─ vitest.ts
│  ├─ setup.ts
│  ├─ coverage.ts
│  └─ playwright.ts
└─ README.md
```

## Главное правило

В `build/` лежит только конфигурация.

Не кладём сюда:

```txt
- компоненты
- страницы
- бизнес-логику
- stores
- API-модули приложения
- тестовые сценарии
- production output
```

Для этого есть другие папки:

```txt
src/        // исходный код приложения
tests/      // e2e-тесты
dist/       // результат сборки
reports/    // отчёты
```

## `vite.ts`

Главный файл Vite-конфигурации.

Отвечает за:

```txt
- подключение plugins
- подключение aliases
- подключение server config
- подключение preview config
- подключение SSR config
- подключение optimization config
```

Корневой `vite.config.ts` должен быть коротким:

```ts
import { createViteConfig } from './build/vite'

export default createViteConfig()
```

## `aliases.ts`

Файл с alias-настройками.

Пример aliases:

```txt
@          -> src
@app       -> src/app
@pages     -> src/pages
@widgets   -> src/widgets
@features  -> src/features
@entities  -> src/entities
@shared    -> src/shared
```

Пример использования:

```ts
import { Button } from '@shared/ui/button'
import { useSessionStore } from '@entities/session'
```

## `chunks.ts`

Файл отвечает за ручное дробление vendor-кода.

Текущая логика:

```txt
vue     -> vue, vue-router, pinia
i18n    -> vue-i18n
http    -> axios
vendor  -> остальные node_modules
```

Зачем это нужно:

```txt
- не складывать всё в один большой vendor.js
- лучше кешировать зависимости
- проще анализировать размер сборки
- быстрее находить тяжёлые пакеты
```

Пример output:

```txt
dist/assets/js/index-xxxxx.js
dist/assets/js/vue-xxxxx.js
dist/assets/js/vendor-xxxxx.js
```

## `plugins.ts`

Файл с Vite plugins.

Используется для:

```txt
- Vue SFC
- оптимизации изображений
- генерации .gz
- генерации .br
- генерации bundle report
```

После сборки ожидаем такие файлы:

```txt
dist/assets/js/vue-xxxxx.js
dist/assets/js/vue-xxxxx.js.gz
dist/assets/js/vue-xxxxx.js.br

dist/assets/js/vendor-xxxxx.js
dist/assets/js/vendor-xxxxx.js.gz
dist/assets/js/vendor-xxxxx.js.br
```

Важно: `.gz` и `.br` дадут пользу только если production server/CDN умеет их отдавать.

Пример нужных headers:

```txt
Content-Encoding: br
Content-Type: application/javascript
Cache-Control: public, max-age=31536000, immutable
```

## `optimization.ts`

Файл с production-настройками сборки.

Основные настройки:

```txt
outDir: dist
assetsDir: assets
sourcemap: false
cssCodeSplit: true
minify: oxc
cssMinify: lightningcss
assetsInlineLimit: 0
chunkSizeWarningLimit: 500
```

Зачем:

```txt
- production output попадает в dist
- sourcemaps не попадают в production
- CSS дробится отдельно
- картинки и шрифты не инлайнятся в base64
- JS/CSS/images/fonts раскладываются по нормальным папкам
```

Пример структуры `dist`:

```txt
dist/
├─ index.html
└─ assets/
   ├─ js/
   ├─ css/
   ├─ images/
   └─ fonts/
```

## `server/`

Папка `server/` содержит настройки dev-server, preview, proxy, headers и SSR.

```txt
server/
├─ index.ts
├─ proxy.ts
├─ preview.ts
├─ ssr.ts
└─ headers.ts
```

### `server/index.ts`

Собирает server config в одном месте.

Обычно экспортирует:

```txt
serverConfig
previewConfig
ssrConfig
```

### `server/proxy.ts`

Dev proxy для API.

Пример:

```txt
/api/users -> http://localhost:3000/users
```

Target берётся из `.env`:

```env
VITE_API_PROXY_TARGET=http://localhost:3000
```

Используется только для локальной разработки.

### `server/preview.ts`

Настройки `vite preview`.

Preview нужен, чтобы локально проверить production build:

```bash
npm run build
npm run preview
```

### `server/headers.ts`

Базовые headers для dev/preview.

Например:

```txt
X-Content-Type-Options
Referrer-Policy
Cache-Control
```

Production headers лучше настраивать на уровне Nginx, backend или CDN.

### `server/ssr.ts`

SSR-настройки Vite.

Пока SSR не используется, файл может быть минимальным.

Когда SSR появится, здесь настраиваются:

```txt
external
noExternal
target
```

## `testing/`

Папка `testing/` содержит конфигурацию тестов.

```txt
testing/
├─ index.ts
├─ vitest.ts
├─ setup.ts
├─ coverage.ts
└─ playwright.ts
```

Важно: в `build/testing/` лежит только конфиг.
Сами тесты лежат отдельно.

```txt
src/**/*.test.ts          // unit/component tests рядом с кодом
tests/e2e/**/*.spec.ts    // e2e-тесты отдельно
```

### `testing/vitest.ts`

Конфигурация unit и component-тестов.

Используется для:

```txt
- TypeScript tests
- Vue component tests
- jsdom environment
- setupFiles
- coverage config
```

### `testing/setup.ts`

Глобальный setup для Vitest.

Обычно используется для:

```txt
- очистки mocks
- глобальных test helpers
- настройки test environment
```

### `testing/coverage.ts`

Настройки покрытия кода.

Coverage report создаётся в:

```txt
reports/coverage
```

### `testing/playwright.ts`

Конфигурация E2E-тестов.

E2E-тесты лежат в:

```txt
tests/e2e
```

Playwright проверяет приложение в браузере: открытие страниц, формы, клики, redirect, ошибки и основные пользовательские сценарии.

## Output folders

### `dist/`

Результат production-сборки.

```txt
dist/
├─ index.html
└─ assets/
```

`dist/` не редактируем руками и не коммитим.

### `reports/`

Папка для отчётов.

```txt
reports/
├─ bundle/
├─ coverage/
├─ lighthouse/
└─ playwright/
```

Отчёты не являются исходным кодом.

## Команды

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Typecheck:

```bash
npm run typecheck
```

Unit/component tests:

```bash
npm run test
```

Coverage:

```bash
npm run test:coverage
```

E2E tests:

```bash
npm run test:e2e
```

Lighthouse:

```bash
npm run lighthouse
```

## Минимальные package scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview --host 127.0.0.1",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "npm run build && playwright test",
    "test:e2e:ui": "npm run build && playwright test --ui",
    "analyze": "npm run build",
    "lighthouse": "npx lighthouse http://127.0.0.1:4173 --output=html --output-path=reports/lighthouse/report.html --view"
  }
}
```

## Git

Коммитим:

```txt
build/
```

Не коммитим:

```txt
dist/
reports/**/*.html
reports/coverage/
reports/playwright/
```

Пример `.gitignore`:

```gitignore
dist
reports/bundle/*.html
reports/lighthouse/*.html
reports/coverage
reports/playwright
```

## Performance notes

Эта конфигурация помогает:

```txt
- дробить код на chunks
- уменьшать размер bundle
- оптимизировать изображения
- готовить gzip/brotli assets
- анализировать bundle
- держать server/proxy/SSR/test config в одном месте
```

Но Lighthouse 100/100 зависит не только от `build/`.

Также важны:

```txt
- размеры изображений
- правильные width/height
- lazy loading
- локальные woff2-шрифты
- font-display: swap
- нормальная HTML-семантика
- accessibility
- SEO meta
- server/CDN headers
- отсутствие лишних сторонних scripts
```

## Правила изменений

Перед изменением `build/`:

```txt
1. Понять, что именно меняется: aliases, chunks, plugins, server, SSR или tests.
2. Не смешивать разные задачи в одном файле.
3. После изменения запустить build.
4. Если менялись тестовые настройки — запустить тесты.
5. Если менялись chunks/plugins — проверить bundle report.
```

Минимальная проверка:

```bash
npm run typecheck
npm run lint
npm run build
npm run test:run
```

Для E2E:

```bash
npm run test:e2e
```
