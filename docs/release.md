# Release

Проект является template-проектом, а не npm-пакетом.

Release используется для версионирования шаблона через:

```txt id="yyk3iu"
git tags
GitHub/GitLab Release
CHANGELOG.md
```

Публикация в npm не используется.

## Tools

В проекте используются:

```txt id="yfk5k7"
semantic-release
commitlint
Conventional Commits
```

## Conventional Commits

Коммиты должны соответствовать формату:

```txt id="rxh8yl"
<type>(optional scope): <description>
```

Примеры:

```txt id="qehp8n"
feat(auth): add login form
fix(api): normalize axios errors
docs(readme): update quick start
chore(ci): update github workflow
refactor(styles): move global styles to shared
```

## Commit types

Основные типы:

```txt id="55m3pq"
feat      → новая функциональность
fix       → исправление ошибки
docs      → документация
style     → форматирование без изменения логики
refactor  → рефакторинг без изменения поведения
test      → тесты
chore     → служебные изменения
ci        → CI/CD
build     → сборка и зависимости
perf      → производительность
revert    → откат изменений
```

## Version bump

`semantic-release` определяет новую версию по коммитам.

Обычно:

```txt id="o0faj1"
fix      → patch
feat     → minor
BREAKING CHANGE → major
```

Примеры:

```txt id="3elxyw"
fix(api): handle empty error response
```

даёт patch release.

```txt id="qvlzid"
feat(router): add protected routes
```

даёт minor release.

```txt id="hh8d3z"
feat(config): change env variable names

BREAKING CHANGE: VITE_API_URL renamed to VITE_API_BASE_URL
```

даёт major release.

## Local dry run

Локально можно проверить release без публикации:

```bash id="qc85ji"
npm run release:dry
```

Dry run должен:

```txt id="d2bcob"
проверить коммиты
рассчитать следующую версию
показать будущий changelog
не создавать tag
не публиковать release
```

## Real release

Реальный release выполняется только в CI/CD.

Управляется переменной:

```txt id="f4pqyy"
ENABLE_RELEASE=true
```

Локально реальный release не запускаем.

## No npm publish

Так как это template-проект, публикация в npm не нужна.

Запрещено добавлять release step:

```txt id="f42lms"
npm publish
```

Версия шаблона фиксируется через git tag и release notes.

## CHANGELOG

`CHANGELOG.md` обновляется автоматически через `semantic-release`.

Не рекомендуется редактировать generated changelog вручную.

## Git tags

Release создаёт git tag:

```txt id="sy6rel"
v1.2.3
```

Tag соответствует версии шаблона.

## CI/CD

Release job должен запускаться только если:

```txt id="c6twu1"
ENABLE_RELEASE=true
```

и только на разрешённой ветке, например:

```txt id="uc7rs7"
main
```

## Recommended release flow

```txt id="h8rvxr"
1. Разработка изменений
2. Коммиты по Conventional Commits
3. Pull Request / Merge Request
4. CI checks
5. Merge в main
6. CI запускает semantic-release
7. Создаётся git tag
8. Обновляется CHANGELOG.md
9. Создаётся GitHub/GitLab Release
```

## Rules

- Проект не публикуется в npm.
- Release делает только CI/CD.
- Локально используется только `npm run release:dry`.
- Версия шаблона живёт в git tags.
- CHANGELOG.md генерируется через semantic-release.
- Коммиты должны проходить commitlint.
