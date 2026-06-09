# Frontend Template

Шаблон для Vue 3 проектов.

## Stack

```txt
Vue 3
TypeScript
Vite
Pinia
Vue Router
Vue I18n
Axios
SCSS
ESLint
Vitest
Playwright
Husky
```

## Быстрый старт

```bash
npm install
npm run dev
```

## Основные команды

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
npm run lint:fix
npm run test
npm run test:run
npm run test:coverage
npm run test:e2e
```

## Структура

```txt
src/
├─ app/
├─ pages/
├─ widgets/
├─ features/
├─ entities/
└─ shared/

build/
tests/
reports/
dist/
```

## Документация

```txt
src/README.md              // FSD-структура проекта
src/shared/README.md       // общий слой shared
build/README.md            // Vite/build/server/testing config
tests/e2e/README.md        // правила e2e-тестов
```

## FSD правила

```txt
app       // инициализация приложения
pages     // страницы
widgets   // крупные блоки интерфейса
features  // пользовательские действия
entities  // бизнес-сущности
shared    // общий переиспользуемый код
```

`shared` не должен импортировать:

```txt
app/
pages/
widgets/
features/
entities/
```

## UI kit

Внешний UI kit нельзя использовать напрямую в `pages`, `widgets`, `features`, `entities`.

Правильно:

```ts
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { useToast } from '@shared/providers/toast'
```

Подробно:

```txt
src/shared/README.md
```

## Проверка перед commit

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

## Build output

Production-сборка создаётся в:

```txt
dist/
```

Отчёты создаются в:

```txt
reports/
```

Папка `build/` — это не output.
Там лежат настройки сборки, оптимизации, сервера и тестов.
