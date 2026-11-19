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

// R4: Importance defaults to Medium.
test('importance defaults to Medium', async ({ page }) => {
  await expect(page.locator('form select').first()).toHaveValue('Medium');
});

// Mark Done changes the button to Mark Undone.
test('marking a task done changes its button to Mark Undone', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Pay rent');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await page.getByRole('button', { name: 'Mark Done' }).click();
  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
});

// Delete removes only the task you clicked.
test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  for (let i = 0; i < 2; i++) {
    await page.getByPlaceholder('What do you need to do?').fill('Call mom');
    await page.getByRole('button', { name: 'Create Task' }).click();
  }
  await expect(page.locator('.task-item')).toHaveCount(2);
  await page.locator('.task-item').first()
    .getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.task-item')).toHaveCount(1);
});
