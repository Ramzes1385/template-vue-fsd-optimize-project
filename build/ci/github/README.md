# GitHub CI/CD

GitHub Actions используется для проверки проекта и автоматического release.

Основные workflow-файлы лежат здесь:

```txt
.github/workflows/
├─ ci.yml
└─ release.yml
```

Важно: GitHub Actions запускает workflow только из папки:

```txt
.github/workflows/
```

Поэтому эти файлы должны оставаться в корне проекта.

Документация и описание логики лежат здесь:

```txt
build/ci/github/README.md
```

## Workflows

CI/CD разделён на два workflow:

```txt
CI
Release
```

## `ci.yml`

Файл:

```txt
.github/workflows/ci.yml
```

Запускается на:

```txt
push
pull_request
workflow_dispatch
```

Проверяет проект командой:

```bash
npm run ci:validate
```

Команда запускает:

```txt
typecheck
lint
unit tests
build
```

## `release.yml`

Файл:

```txt
.github/workflows/release.yml
```

Запускается на:

```txt
push в main
workflow_dispatch
```

Release создаётся через semantic-release:

```bash
npm run release:github
```

Release создаёт:

```txt
CHANGELOG.md
git tag
GitHub Release
```

## Управление CI/CD

CI/CD управляется переменными GitHub Actions:

```txt
ENABLE_CI=true|false
ENABLE_RELEASE=true|false
```

По умолчанию для шаблона:

```txt
ENABLE_CI=true
ENABLE_RELEASE=false
```

## Где задавать переменные

В GitHub:

```txt
Repository
→ Settings
→ Secrets and variables
→ Actions
→ Variables
→ New repository variable
```

Добавить:

```txt
ENABLE_CI=true
ENABLE_RELEASE=false
```

## Как отключить CI

```txt
ENABLE_CI=false
```

После этого workflow `CI` не будет выполнять job `validate`.

## Как включить release

```txt
ENABLE_RELEASE=true
```

Release запускается только если:

```txt
ENABLE_RELEASE=true
branch=main
```

## Token для release

Для GitHub release используется token:

```txt
GITHUB_TOKEN
```

Его не нужно создавать вручную.

GitHub Actions автоматически создаёт `GITHUB_TOKEN` внутри workflow.

В `release.yml` он подключается так:

```yml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Для release job должны быть права:

```yml
permissions:
  contents: write
  issues: write
  pull-requests: write
```

## Локальный dry-run

Локально можно проверить расчёт версии:

```bash
npm run release:dry
```

Этот режим ничего не создаёт.

Он только показывает:

```txt
следующую версию
release type
release notes
```

## Реальный release

Реальный release должен запускаться в GitHub Actions:

```bash
npm run release:github
```

Локально полноценный release запускать не нужно.

## Scripts

В `package.json` должны быть команды:

```json
{
  "scripts": {
    "ci:validate": "npm run typecheck && npm run lint && npm run test:run && npm run build",
    "release:github": "semantic-release --extends ./build/release/semantic-release.config.cjs",
    "release:dry": "semantic-release --dry-run --extends ./build/release/semantic-release.local.config.cjs"
  }
}
```

## GitHub workflow files

CI workflow:

```txt
.github/workflows/ci.yml
```

Release workflow:

```txt
.github/workflows/release.yml
```

Эти файлы нельзя полностью перенести в `build/ci/github`, потому что GitHub Actions ищет workflow только в `.github/workflows`.

## Правило

```txt
build/ci/github/
  хранит документацию по GitHub CI/CD

.github/workflows/
  хранит реальные GitHub Actions workflow-файлы
```

Основную логику команд лучше держать в `package.json` scripts:

```txt
ci:validate
release:github
release:dry
```

Так workflow-файлы остаются короткими и понятными.
