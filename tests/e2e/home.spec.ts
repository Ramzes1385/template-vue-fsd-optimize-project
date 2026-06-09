import { expect, test } from '@playwright/test'

test('opens home page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: /home/i })).toBeVisible()
})
