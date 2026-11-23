import { test, expect } from '@playwright/test';

// Every test gets a fresh browser profile, so localStorage always starts empty.
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

// Requirement 6: the title starts with a capital letter.
test('a lowercase title is saved with a capital letter', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
});

// Requirement 1: the title is required.
test('a task with an empty title is not created', async ({ page }) => {
  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.locator('.task-item')).toHaveCount(0);
});

// Requirement 3: a new task is not completed.
test('a new task starts as not completed', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const task = page.locator('.task-item').filter({ hasText: 'Buy milk' });
  await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});

// Delete removes only the task you clicked, even when two tasks share a title.
test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  for (let i = 0; i < 2; i++) {
    await page.getByPlaceholder('What do you need to do?').fill('Call mom');
    await page.getByRole('button', { name: 'Create Task' }).click();
  }
  await expect(page.locator('.task-item')).toHaveCount(2);

  await page.locator('.task-item').first().getByRole('button', { name: 'Delete' }).click();

  await expect(page.locator('.task-item')).toHaveCount(1);
});

// Cancel closes the edit form and changes nothing.
test('cancelling an edit does not mark the task as done', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click();

  // The title moves into an input while editing, so hasText no longer matches it.
  const task = page.locator('.task-item').first();
  await task.getByRole('button', { name: 'Edit' }).click();
  await task.getByRole('button', { name: 'Cancel' }).click();

  await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});
