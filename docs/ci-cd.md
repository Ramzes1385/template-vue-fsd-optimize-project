# CI/CD

CI/CD конфиги проекта хранятся в `build/ci`.

Корневые файлы CI остаются только entrypoint-ами для платформ.

## Structure

```txt id="bql36c"
build/ci/
  github/
  gitlab/

.github/
  workflows/

.gitlab-ci.yml
```

## Правило

CI/CD логика живёт в:

```txt id="95wd2l"
build/ci/
```

Entrypoint-ы платформ остаются на стандартных местах:

```txt id="4v0c74"
.github/workflows/*.yml
.gitlab-ci.yml
```

Это нужно, потому что GitHub Actions и GitLab CI ожидают конфиги именно там.

## GitHub Actions

GitHub workflow лежит в:

```txt id="6tr1xo"
.github/workflows/
```

Он должен подключать или повторять логику из:

```txt id="todn19"
build/ci/github/
```

## GitLab CI

Корневой файл:

```txt id="8il35x"
.gitlab-ci.yml
```

должен подключать основной конфиг:

```yaml id="j5va0k"
include:
  - local: build/ci/gitlab/gitlab-ci.yml
```

## Environment flags

CI/CD управляется переменными:

```txt id="g8j0oz"
ENABLE_CI
ENABLE_RELEASE
```

## ENABLE_CI

Если `ENABLE_CI` выключен, основные проверки не должны запускаться.

Пример значения:

```txt id="wv4eqs"
ENABLE_CI=true
```

## ENABLE_RELEASE

Если `ENABLE_RELEASE` выключен, release job не должен запускаться.

Пример значения:

```txt id="xbal8r"
ENABLE_RELEASE=true
```

## Recommended CI checks

Базовый pipeline должен выполнять:

```bash id="109byb"
npm ci
npm run lint
npm run type-check
npm run test:unit
npm run build
```

E2E можно запускать отдельным job:

```bash id="0hcgn4"
npm run test:e2e
```

## Reports

Отчёты сохраняются в:

```txt id="3zgjjf"
reports/
  coverage/
  playwright/
  bundle/
```

## Release

Реальный release выполняется только в CI/CD.

Локально разрешена dry-run проверка:

```bash id="74wh00"
npm run release:dry
```

## Rules

- Конфиги CI/CD лежат в `build/ci`.
- `.github/workflows` остаётся entrypoint для GitHub Actions.
- `.gitlab-ci.yml` остаётся entrypoint для GitLab CI.
- GitLab entrypoint подключает `build/ci/gitlab/gitlab-ci.yml`.
- `ENABLE_CI` управляет запуском проверок.
- `ENABLE_RELEASE` управляет release job.
- Реальный release не запускается локально.
