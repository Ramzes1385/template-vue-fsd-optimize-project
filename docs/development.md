# Development

Документ описывает базовый workflow разработки template-проекта.

## Install

```bash
npm install
```

## Dev server

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Quality checks

Перед commit желательно запускать:

```bash
npm run lint
npm run type-check
npm run test:unit
npm run build
```

Полная проверка:

```bash
npm run lint
npm run type-check
npm run test:unit
npm run test:coverage
npm run build
npm run test:e2e
```

## Tests

Unit tests:

```bash
npm run test:unit
```

Unit tests in watch mode:

```bash
npm run test:unit:watch
```

Coverage:

```bash
npm run test:coverage
```

E2E tests:

```bash
npm run test:e2e
```

E2E UI mode:

```bash
npm run test:e2e:ui
```

## Release dry run

Локальная проверка release:

```bash
npm run release:dry
```

Реальный release выполняется только через CI/CD.

## Git commits

Проект использует Conventional Commits.

Примеры:

```txt
feat(auth): add login form
fix(api): normalize axios errors
docs(readme): update documentation
refactor(styles): move global styles to shared
chore(ci): update gitlab pipeline
```

## Recommended workflow

```txt
1. Создать branch
2. Сделать изменения
3. Проверить lint/type-check/tests/build
4. Сделать commit по Conventional Commits
5. Открыть Pull Request / Merge Request
6. Дождаться CI
7. Merge в main
```

## Architecture checks

ESLint защищает:

```txt
FSD layer boundaries
public API imports
UI kit import restrictions
```

Проверка:

```bash
npm run lint
```

## Build configs

Конфиги лежат в `build/`.

```txt
build/
  eslint/
  testing/
  ci/
  vite.ts
  plugins.ts
  styles.ts
```

Корневые конфиги остаются entrypoint-ами:

```txt
eslint.config.ts
vite.config.ts
vitest.config.ts
playwright.config.ts
```

## Environment

Перед запуском проекта нужно создать `.env`.

Пример:

```bash
cp .env.example .env
```

Пример содержимого:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Rules

- Не импортировать верхние FSD-слои в нижние.
- Не использовать deep imports между slices.
- Не импортировать UI kit напрямую вне разрешённых shared-зон.
- Не хранить секреты в `VITE_*`.
- Глобальные стили подключать только через `@shared/styles/index.scss`.
- API-запросы делать через `@shared/api`.
- App-level API initialization держать в `@app/providers/api`.
- Release запускать только через CI/CD.
