# Vue FSD Template

Template-проект для Vue 3 + TypeScript + Vite + SCSS с архитектурой Feature-Sliced Design.

## Stack

- Vue 3
- TypeScript
- Vite
- SCSS
- Pinia
- Vue Router
- Axios
- Vitest
- Playwright
- ESLint
- Oxlint
- Prettier
- semantic-release
- commitlint

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

### Development

```bash
npm run dev
npm run build
npm run preview
```

### Quality

```bash
npm run lint
npm run type-check
```

### Tests

```bash
npm run test
npm run test:unit
npm run test:unit:watch
npm run test:coverage

npm run test:e2e
npm run test:e2e:ui
```

### Release

```bash
npm run release:dry
```

Реальный release выполняется только через CI/CD.

## Project structure

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/

build/
  eslint/
  testing/
  ci/
  vite.ts
  plugins.ts
  styles.ts

docs/
```

## FSD layers

Проект использует Feature-Sliced Design.

```txt
app      → pages, widgets, features, entities, shared
pages    → widgets, features, entities, shared
widgets  → features, entities, shared
features → entities, shared
entities → shared
shared   → только shared
```

`shared` не должен импортировать верхние слои.

## Import rules

Правильно:

```ts
import { UserAvatar } from '@entities/user'
import { AuthByEmailForm } from '@features/auth-by-email'
import { Button } from '@shared/ui/button'
```

Неправильно:

```ts
import UserAvatar from '@entities/user/ui/UserAvatar.vue'
import { Button } from 'some-ui-kit'
```

Deep imports между slices запрещены.

## Configs

Конфиги проекта вынесены в `build/`.

Корневые файлы остаются entrypoint-ами:

```txt
eslint.config.ts
vite.config.ts
vitest.config.ts
playwright.config.ts
```

## Environment

Пример переменных окружения:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Все env-переменные с префиксом `VITE_` попадают в клиентский bundle. Не храните там секреты.

## API

Проект использует Axios.

```txt
shared/api          → базовый httpClient, типы, normalizeApiError
app/providers/api   → token interceptor, error reporting
```

`shared/api` не должен знать про session, router или app-level логику.

## Styles

Глобальные стили находятся только в:

```txt
src/shared/styles/
```

Единая точка входа:

```ts
import '@shared/styles/index.scss'
```

SCSS tokens и mixins подключаются через `build/styles.ts`.

## Testing

Unit-тесты:

```txt
Vitest
```

E2E-тесты:

```txt
Playwright
```

Template может не иметь unit-тестов, поэтому включено:

```txt
passWithNoTests: true
```

Coverage не содержит обязательных thresholds, чтобы пустой template не падал.

## Release

Проект является template-проектом, а не npm-пакетом.

Версия шаблона ведётся через:

- git tags
- GitHub/GitLab Release
- CHANGELOG.md

Публикация в npm не используется.

## Documentation

Подробная документация:

```txt
docs/
  architecture.md
  fsd-rules.md
  providers.md
  routing.md
  api.md
  env.md
  styles.md
  testing.md
  ci-cd.md
  release.md
  development.md
```

### Main docs

- [Architecture](docs/architecture.md)
- [FSD Rules](docs/fsd-rules.md)
- [Providers](docs/providers.md)
- [Routing](docs/routing.md)
- [API](docs/api.md)
- [Environment](docs/env.md)
- [Styles](docs/styles.md)
- [Testing](docs/testing.md)
- [CI/CD](docs/ci-cd.md)
- [Release](docs/release.md)
- [Development](docs/development.md)

## Recommended check before commit

```bash
npm run lint
npm run type-check
npm run test:unit
npm run build
```

Full check:

```bash
npm run lint
npm run type-check
npm run test:unit
npm run test:coverage
npm run build
npm run test:e2e
```

## Rules summary

- Соблюдать FSD layer boundaries.
- Использовать public API slices через `index.ts`.
- Не делать deep imports между slices.
- Не импортировать UI kit напрямую вне разрешённых shared-зон.
- Хранить глобальные стили только в `shared/styles`.
- Использовать `@shared/config/env` вместо прямого `import.meta.env`.
- Использовать `@shared/api` для запросов.
- App-level инициализацию держать в `app/providers`.
- Release запускать только через CI/CD.
