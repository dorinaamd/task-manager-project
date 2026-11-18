import { test, expect } from '@playwright/test';

test.use({
  screenshot: 'only-on-failure',
  trace: 'retain-on-failure',
  video: 'retain-on-failure',
});

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the app loads and shows its heading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
});

test('a new task appears in the list', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
});

// R4: Importance is Medium by default.
test('the importance dropdown defaults to Medium', async ({ page }) => {
  await expect(page.locator('form select').first()).toHaveValue('Medium');
});

// Filter by category: only tasks of the chosen category stay.
test('filtering by Home leaves only the Home task', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Write report');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.getByPlaceholder('What do you need to do?').fill('Clean kitchen');
  await page.locator('form select').nth(1).selectOption('Home');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.locator('.filter-sort select').first().selectOption('Home');
  await expect(page.locator('.task-item')).toHaveCount(1);
});

// Delete removes only the task you clicked.
test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  for (let i = 0; i < 2; i++) {
    await page.getByPlaceholder('What do you need to do?').fill('Call mom');
    await page.getByRole('button', { name: 'Create Task' }).click();
  }
  await expect(page.locator('.task-item')).toHaveCount(2);

  await page.locator('.task-item').first().getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.task-item')).toHaveCount(1);
});
