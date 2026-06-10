# Styles

Глобальные стили проекта находятся в `src/shared/styles`.

## Structure

```txt
src/shared/styles/
  index.scss

  base/
    _reset.scss
    _global.scss
    _base.scss

  tokens/
    index.scss
    _colors.scss
    _spacing.scss
    _typography.scss
    _z-index.scss

  mixins/
    index.scss
    _media.scss
    _a11y.scss

  vendors/
    _ui-kit.scss
```

## Entrypoints

`index.scss` — публичная точка входа.

```txt
src/shared/styles/index.scss
```

Он подключается один раз в entrypoint приложения:

```ts
import '@shared/styles/index.scss'
```

## SCSS partials

Файлы с `_` — внутренние SCSS partials.

Пример:

```txt
_reset.scss
_base.scss
_colors.scss
_media.scss
_ui-kit.scss
```

Они не импортируются напрямую в TypeScript/Vue entrypoint.

Правильно:

```scss
@use './base/reset';
```

Sass сам найдёт файл:

```txt
base/_reset.scss
```

## Global styles

Глобальные стили подключаются только через:

```txt
src/shared/styles/index.scss
```

Пример:

```scss
@use './base/reset';
@use './base/global';
@use './base/base';

@use './vendors/ui-kit';
```

Не нужно импортировать глобальные стили из `pages`, `widgets`, `features`, `entities`.

## Tokens

Design tokens лежат в:

```txt
src/shared/styles/tokens/
```

Пример:

```scss
$color-text-primary: #111827;
$spacing-4: 16px;
$font-size-md: 16px;
$z-index-modal: 1000;
```

Public entrypoint:

```scss
@forward './colors';
@forward './spacing';
@forward './typography';
@forward './z-index';
```

## CSS variables

CSS variables объявляются в:

```txt
src/shared/styles/base/_global.scss
```

Пример:

```scss
:root {
  --color-text-primary: #{$color-text-primary};
  --color-bg-primary: #{$color-bg-primary};
  --font-family-base: #{$font-family-base};
}
```

Компоненты могут использовать CSS variables напрямую:

```scss
.card {
  color: var(--color-text-primary);
  background: var(--color-bg-primary);
}
```

## Mixins

Mixins лежат в:

```txt
src/shared/styles/mixins/
```

Пример:

```scss
@mixin media-up($breakpoint) {
  @media (min-width: $value) {
    @content;
  }
}
```

Использование в компонентах:

```scss
.card {
  @include media-up(md) {
    padding: $spacing-6;
  }
}
```

## Vite SCSS globals

SCSS tokens и mixins подключаются глобально через Vite config.

Файл:

```txt
build/styles.ts
```

Пример:

```ts
import type { UserConfig } from 'vite'

export const cssConfig = {
  preprocessorOptions: {
    scss: {
      additionalData: `
        @use "@shared/styles/tokens" as *;
        @use "@shared/styles/mixins" as *;
      `,
    },
  },
} satisfies UserConfig['css']
```

После этого в `.vue` можно использовать tokens и mixins без ручного `@use`.

## Vendor styles

Стили внешнего UI kit подключаются только здесь:

```txt
src/shared/styles/vendors/_ui-kit.scss
```

Пример:

```scss
@use 'some-ui-kit/dist/styles.css';
```

Запрещено импортировать vendor styles напрямую из:

```txt
pages/
widgets/
features/
entities/
```

## Component styles

В компонентах используем scoped styles:

```vue
<style scoped lang="scss">
.root {
  padding: $spacing-4;
}
</style>
```

Глобальные селекторы внутри компонентов лучше избегать.

## Rules

- `src/shared/styles/index.scss` — единственная точка глобальных стилей.
- `vendors/_ui-kit.scss` — единственное место для глобальных стилей UI kit.
- `index.scss` без `_` — public entrypoint.
- `_*.scss` — внутренние partial-файлы.
- Компоненты используют `<style scoped lang="scss">`.
- `pages/widgets/features/entities` не импортируют UI kit CSS напрямую.
