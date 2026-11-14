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
  await expect(page.getByRole('heading', { name: 'Daybreak Tasks' }))
    .toBeVisible();
});

test('a new task appears in the list', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click()
  await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
});

// R4: Importance defaults to Medium
test('importance defaults to Medium', async ({ page }) => {
  await expect(page.locator('form select').first()).toHaveValue('Medium');
});

// R5: Category defaults to Work
test('category defaults to Work', async ({ page }) => {
  await expect(page.locator('form select').nth(1)).toHaveValue('Work');
});

// F1: Add a task with chosen importance and category
test('creating a task with High and Home shows them on its card', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Clean kitchen');
  await page.locator('form select').first().selectOption('High');
  await page.locator('form select').nth(1).selectOption('Home');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const card = page.locator('.task-item');
  await expect(card).toContainText('Importance: High');
  await expect(card).toContainText('Category: Home');
});

// F4: Mark a task complete / incomplete
test('clicking Mark Done changes the button to Mark Undone', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Walk the dog');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.getByRole('button', { name: 'Mark Done' }).click();
  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
});

// F5: Filter tasks by category
test('filtering by Home shows only the Home task', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Send email');
  await page.locator('form select').nth(1).selectOption('Work');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.getByPlaceholder('What do you need to do?').fill('Fix lamp');
  await page.locator('form select').nth(1).selectOption('Home');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.locator('.filter-sort select').first().selectOption('Home');
  await expect(page.locator('.task-item')).toHaveCount(1);
});

// F1: Created tasks persist across page reloads
test('a created task is still there after reloading the page', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Read a chapter');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Read a chapter' })).toBeVisible();
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
