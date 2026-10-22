import { test, expect } from '@playwright/test';
import { Page         } from '@playwright/test';

// HELPER: login
async function login(page: Page, username: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

// TEST: login success
test('login-success', async ({ page }) => {
  await login(page, 'admin', 'password123');
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).not.toBeNull();
});