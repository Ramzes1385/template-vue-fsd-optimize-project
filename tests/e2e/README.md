# E2E Tests

E2E-тесты проверяют приложение как пользователь: открыть страницу, заполнить форму, нажать кнопку, проверить результат.

## Где лежат тесты

```txt
tests/e2e/
├─ smoke/
├─ auth/
├─ profile/
└─ i18n/
```

Примеры:

```txt
tests/e2e/smoke/app.spec.ts
tests/e2e/auth/login.spec.ts
tests/e2e/auth/logout.spec.ts
tests/e2e/profile/profile.spec.ts
```

## Как запускать

Запустить все E2E-тесты:

```bash
npm run test:e2e
```

Запустить UI-режим Playwright:

```bash
npm run test:e2e:ui
```

Запустить один файл:

```bash
npx playwright test tests/e2e/auth/login.spec.ts
```

Запустить тест по названию:

```bash
npx playwright test -g "logs in user"
```

Открыть отчёт:

```bash
npx playwright show-report reports/playwright
```

## Что тестируем через E2E

Пишем E2E-тесты только на важные пользовательские сценарии:

```txt
- приложение открывается
- пользователь может войти
- пользователь может выйти
- защищённая страница редиректит на login
- форма показывает ошибки
- пользователь может сохранить данные
- переключение языка работает
- важный бизнес-сценарий проходит от начала до конца
```

## Что НЕ тестируем через E2E

Не пишем E2E для мелочей:

```txt
- utility-функции
- форматирование дат
- маленькие computed
- отдельные Pinia actions
- внешний вид одной маленькой кнопки
```

Для этого есть unit/component-тесты.

## Простой шаблон теста

```ts
import { expect, test } from '@playwright/test'

test('opens home page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /home/i })).toBeVisible()
})
```

## Как писать селекторы

Сначала используем нормальные пользовательские селекторы:

```ts
page.getByRole('button', { name: /login/i })
page.getByLabel(/email/i)
page.getByPlaceholder(/search/i)
page.getByText(/profile/i)
```

Плохо:

```ts
page.locator('.btn-primary')
page.locator('#email')
page.locator('div > div > button:nth-child(2)')
```

CSS-селекторы ломаются при изменении верстки. Используем их только если нет другого варианта.

## Когда использовать `data-testid`

Если элемент нельзя нормально найти через `role`, `label` или `text`, добавляем `data-testid`.

```vue
<button data-testid="logout-button">
  Logout
</button>
```

```ts
await page.getByTestId('logout-button').click()
```

Не ставим `data-testid` на каждый элемент.

## Не использовать таймеры

Плохо:

```ts
await page.waitForTimeout(2000)
```

Хорошо:

```ts
await expect(page.getByText(/saved/i)).toBeVisible()
await expect(page).toHaveURL(/\/profile/)
```

Тест должен ждать конкретный результат, а не случайное количество секунд.

## Пример: login

```ts
import { expect, test } from '@playwright/test'

test('logs in user and redirects to profile', async ({ page }) => {
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        accessToken: 'test-access-token',
        user: {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
        },
      }),
    })
  })

  await page.goto('/login')

  await page.getByLabel(/email/i).fill('john@example.com')
  await page.getByLabel(/password/i).fill('password123')

  await page.getByRole('button', { name: /login|sign in|войти/i }).click()

  await expect(page).toHaveURL(/\/profile/)
  await expect(page.getByText(/john doe/i)).toBeVisible()
})
```

## Пример: ошибка логина

```ts
import { expect, test } from '@playwright/test'

test('shows error for invalid credentials', async ({ page }) => {
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Invalid email or password',
      }),
    })
  })

  await page.goto('/login')

  await page.getByLabel(/email/i).fill('wrong@example.com')
  await page.getByLabel(/password/i).fill('wrong-password')

  await page.getByRole('button', { name: /login|sign in|войти/i }).click()

  await expect(page.getByText(/invalid email or password/i)).toBeVisible()
})
```

## Пример: валидация формы

```ts
import { expect, test } from '@playwright/test'

test('shows validation errors for empty login form', async ({ page }) => {
  await page.goto('/login')

  await page.getByRole('button', { name: /login|sign in|войти/i }).click()

  await expect(page.getByText(/email is required|email обязателен/i)).toBeVisible()
  await expect(page.getByText(/password is required|пароль обязателен/i)).toBeVisible()
})
```

## Пример: protected route

```ts
import { expect, test } from '@playwright/test'

test('redirects guest from profile to login', async ({ page }) => {
  await page.goto('/profile')

  await expect(page).toHaveURL(/\/login/)
})
```

## Пример: logout

```ts
import { expect, test } from '@playwright/test'

test('logs out user', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('accessToken', 'test-access-token')
  })

  await page.route('**/api/users/me', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      }),
    })
  })

  await page.goto('/profile')

  await expect(page.getByText(/john doe/i)).toBeVisible()

  await page.getByRole('button', { name: /logout|выйти/i }).click()

  await expect(page).toHaveURL(/\/login/)
})
```

## Как называть тесты

Название должно описывать действие пользователя и ожидаемый результат.

Хорошо:

```ts
test('logs in user and redirects to profile', async ({ page }) => {})
test('shows validation errors for empty login form', async ({ page }) => {})
test('redirects guest from profile to login', async ({ page }) => {})
```

Плохо:

```ts
test('login test', async ({ page }) => {})
test('button works', async ({ page }) => {})
test('test 1', async ({ page }) => {})
```

## Правила

```txt
- один тест = один основной сценарий
- тест должен запускаться отдельно
- тест не должен зависеть от другого теста
- не используем waitForTimeout
- не кликаем по nth-child
- не завязываемся на CSS-классы
- API лучше мокать, если backend нестабилен
- проверяем результат, который видит пользователь
```

## Минимальный набор E2E

На старте достаточно:

```txt
tests/e2e/
├─ smoke/
│  └─ app.spec.ts
├─ auth/
│  ├─ login.spec.ts
│  ├─ login-validation.spec.ts
│  ├─ logout.spec.ts
│  └─ protected-route.spec.ts
└─ i18n/
   └─ change-language.spec.ts
```
