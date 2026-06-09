# GitLab CI/CD

GitLab CI/CD используется для проверки проекта и автоматического release.

Основной config лежит здесь:

```txt
build/ci/gitlab/gitlab-ci.yml
```

В корне проекта остаётся только entrypoint:

```txt
.gitlab-ci.yml
```

Он подключает основной config:

```yml
include:
  - local: 'build/ci/gitlab/gitlab-ci.yml'
```

## Jobs

CI/CD состоит из двух стадий:

```txt
validate
release
```

## `validate`

Проверяет проект:

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

## `release`

Запускает автоматический release через semantic-release:

```bash
npm run release:gitlab
```

Release создаёт:

```txt
CHANGELOG.md
git tag
GitLab Release
```

## Управление CI/CD

CI/CD управляется переменными:

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

В GitLab:

```txt
Project
→ Settings
→ CI/CD
→ Variables
→ Add variable
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

После этого job `validate` не будет запускаться.

## Как включить release

```txt
ENABLE_RELEASE=true
```

Release запускается только если:

```txt
ENABLE_RELEASE=true
CI_COMMIT_BRANCH=main
```

## Token для release

Для GitLab release нужен token:

```txt
GL_TOKEN
```

или:

```txt
GITLAB_TOKEN
```

Добавляется там же:

```txt
Project
→ Settings
→ CI/CD
→ Variables
→ Add variable
```

Рекомендуемые настройки:

```txt
Key: GL_TOKEN
Masked: true
Protected: по ситуации
```

Token должен иметь права на создание release/tag.

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

Реальный release должен запускаться в GitLab CI:

```bash
npm run release:gitlab
```

Локально полноценный release запускать не нужно.

## Scripts

В `package.json` должны быть команды:

```json
{
  "scripts": {
    "ci:validate": "npm run typecheck && npm run lint && npm run test:run && npm run build",
    "release:gitlab": "semantic-release --extends ./build/release/semantic-release.gitlab.config.cjs",
    "release:dry": "semantic-release --dry-run --extends ./build/release/semantic-release.local.config.cjs"
  }
}
```

## GitLab config path

Основной файл:

```txt
build/ci/gitlab/gitlab-ci.yml
```

Корневой файл:

```txt
.gitlab-ci.yml
```

Корневой файл нужен, чтобы GitLab автоматически нашёл CI/CD config.

## Правило

```txt
build/ci/gitlab/
  хранит основной GitLab CI/CD config и документацию

.gitlab-ci.yml
  только подключает build/ci/gitlab/gitlab-ci.yml
```

Не нужно держать всю GitLab CI/CD логику в корне проекта.
