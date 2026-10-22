import { test, expect } from '@playwright/test';
import { Page         } from '@playwright/test';

// HELPER: login
async function login(page: Page, username: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign in' }).click();
}

// HELPER: signup
async function signup(page: Page, username: string, password: string): Promise<void> {
  await page.goto('/signup');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign up' }).click();
}

// TEST: login success
test('login-success', async ({ page }) => {
  await login(page, 'admin', 'password123');
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).not.toBeNull();
});

// TEST: login fail
test('login-fail', async ({ page }) => {
  await login(page, 'not-existing-user', 'wrong-password');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL('/login');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});

// TEST: signup fail
test('signup-fail', async ({ page }) => {
  await signup(page, 'admin', 'password123');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL('/signup');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});

// TEST: logout
test('logout', async ({ page }) => {
  await login(page, 'admin', 'password123');
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).not.toBeNull();
  await page.goto('/profile');
  await expect(page.locator('.logout-button')).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('token'))).toBeNull();
});

// TEST: wrong guess
test('wrong-guess', async ({ page }) => {
  await login(page, 'bad-guesser', 'password-bad-guesser');
  await expect(page).toHaveURL('/');
  await page.goto('/guess/ba511bf6-d96b-4391-b165-ab8e8b4f8949');
  await expect(page.locator('.drawing-container img')).toBeVisible();
  await page.getByPlaceholder('TYPE YOUR GUESS...').fill('wrong-answer');
  const responsePromise = page.waitForResponse(response => response.url().includes('/guesses') && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'SEND' }).click();
  const response = await responsePromise;
  await expect(page.locator('.guess-attempt').last()).toContainText('wrong-answer', {ignoreCase: true});
  await expect(page.locator('.guess-attempt').last()).toContainText('WRONG');
  await expect(page.locator('.attempts-left')).toContainText('9/10');
});

// TEST: correct guess
test('correct-guess', async ({ page }) => {
  await login(page, 'good-guesser', 'password-good-guesser');
  await expect(page).toHaveURL('/');
  await page.goto('/guess/29fed4e4-afc8-4816-b7ff-42f86f8a2ed2');
  await expect(page.locator('.drawing-container img')).toBeVisible();
  await page.getByPlaceholder('TYPE YOUR GUESS...').fill('kid icarus');
  const responsePromise = page.waitForResponse(response => response.url().includes('/guesses') && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'SEND' }).click();
  const response = await responsePromise;
  await expect(page.locator('.guess-attempt').last()).toContainText('kid icarus', {ignoreCase: true});
  await expect(page.locator('.guess-attempt').last()).toContainText('CORRECT');
  await expect(page.locator('.attempts-left')).toContainText('9/10');
  await expect(page.locator('.guess-feedback')).toContainText('Correct!');
});

// TEST: guess after attempts exhausted
test('guess-attempts-exhausted', async ({ page }) => {
  await login(page, 'bad-guesser', 'password-bad-guesser');
  await expect(page).toHaveURL('/');
  await page.goto('/guess/ba511bf6-d96b-4391-b165-ab8e8b4f8949');
  await expect(page.locator('.drawing-container img')).toBeVisible();
  await expect(page.locator('.attempts-left')).toContainText('0/10');
  await page.getByPlaceholder('TYPE YOUR GUESS...').fill('another-wrong-answer');
  const responsePromise = page.waitForResponse(response => response.url().includes('/guesses') && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'SEND' }).click();
  const response = await responsePromise;
  expect(response.status()).toBe(400);
  await expect(page.locator('.guess-feedback')).toContainText('Zero attempts left');
});

// TEST: trying to auto-guess
test('auto-guess', async ({ page }) => {
  await login(page, 'admin', 'password123');
  await expect(page).toHaveURL('/');
  await page.goto('/guess/ba511bf6-d96b-4391-b165-ab8e8b4f8949');
  await expect(page.locator('.drawing-container img')).toBeVisible();
  await page.getByPlaceholder('TYPE YOUR GUESS...').fill('some-guess');
  const responsePromise = page.waitForResponse(response => response.url().includes('/guesses') && response.request().method() === 'POST');
  await page.getByRole('button', { name: 'SEND' }).click();
  const response = await responsePromise;
  expect(response.status()).toBe(400);
  await expect(page.locator('.guess-feedback')).toContainText('Auto-guess not allowed');
  await expect(page.locator('.guess-attempt')).toHaveCount(0);
});