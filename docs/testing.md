# Testing

В проекте используются два уровня тестирования:

```txt
Vitest     → unit/component tests
Playwright → e2e tests
```

Конфиги тестов вынесены в `build/testing`.

## Structure

```txt
build/testing/
  coverage.ts
  index.ts
  playwright.ts
  setup.ts
  vitest.ts

tests/
  e2e/
```

Корневые файлы являются entrypoint-ами:

```txt
vitest.config.ts
playwright.config.ts
```

## Vitest

Vitest используется для unit-тестов и тестов небольших модулей.

Конфиг:

```txt
build/testing/vitest.ts
```

Entrypoint:

```txt
vitest.config.ts
```

## Test files

Vitest ищет тесты по паттернам:

```txt
src/**/*.{test,spec}.{ts,tsx}
src/**/*.{test,spec}.vue
```

Пример:

```txt
src/shared/lib/format-date/format-date.test.ts
src/features/auth-by-email/model/validation.test.ts
```

## passWithNoTests

В template-проекте тестов может не быть сразу после генерации проекта.

Поэтому включено:

```ts
passWithNoTests: true
```

Это позволяет командам тестирования завершаться успешно, даже если тестовые файлы ещё не добавлены.

## Coverage

Coverage включается через V8 provider.

Конфиг:

```txt
build/testing/coverage.ts
```

Отчёты сохраняются в:

```txt
reports/coverage
```

Для template не используются обязательные thresholds, потому что проект может стартовать без unit-тестов.

Правильно для template:

```txt
coverage report генерируется
coverage thresholds не валят проект
```

Позже в реальном проекте можно добавить строгие thresholds отдельно.

## Setup

Глобальный setup для Vitest:

```txt
build/testing/setup.ts
```

Пример:

```ts
import { afterEach, vi } from 'vitest'

afterEach(() => {
  vi.clearAllMocks()
})
```

## Playwright

Playwright используется для e2e-тестов.

Конфиг:

```txt
build/testing/playwright.ts
```

Entrypoint:

```txt
playwright.config.ts
```

E2E-тесты лежат здесь:

```txt
tests/e2e/
```

Пример:

```txt
tests/e2e/home.spec.ts
```

## Playwright reports

HTML-отчёты сохраняются в:

```txt
reports/playwright
```

## Scripts

```bash
npm run test
npm run test:unit
npm run test:unit:watch
npm run test:coverage

npm run test:e2e
npm run test:e2e:ui
```

## Recommended check

Перед merge/release желательно запускать:

```bash
npm run lint
npm run type-check
npm run test:unit
npm run build
npm run test:e2e
```

## Rules

- Unit-тесты лежат рядом с тестируемым кодом.
- E2E-тесты лежат в `tests/e2e`.
- Template допускает отсутствие unit-тестов.
- Coverage не должен ломать пустой template.
- Отчёты тестов складываются в `reports/`.
