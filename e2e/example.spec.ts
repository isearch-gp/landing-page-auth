import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Landing-Page-Auth/);
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
});
