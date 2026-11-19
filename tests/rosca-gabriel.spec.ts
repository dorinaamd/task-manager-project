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
  await expect(
    page.getByRole('heading', { name: 'Daybreak Tasks' })
  ).toBeVisible();
});

test('a new task appears in the list', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(
    page.getByRole('heading', { name: 'Buy milk' })
  ).toBeVisible();
});

// R4: Importance defaults to Medium. 
test('importance is Medium by default', async ({ page }) => {
  await expect(
    page.locator('form select').first()
  ).toHaveValue('Medium');
});

// R5: Category defaults to Work.
test('category is Work by default', async ({ page }) => {
  await expect(
    page.locator('form select').nth(1)
  ).toHaveValue('Work');
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


// Test 6: A task can be created with High importance and Home category.
test('a task can be created with High importance and Home category', async ({ page }) => {
  await page.locator('form select').first().selectOption('High');
  await page.locator('form select').nth(1).selectOption('Home');

  await page.getByPlaceholder('What do you need to do?').fill('Clean my room');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const task = page.locator('.task-item').filter({ hasText: 'Clean my room' });

  await expect(task).toContainText('Importance: High');
  await expect(task).toContainText('Category: Home');
});

// Test 7: A task can be marked as done.
test('a task can be marked as done', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Finish homework');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const task = page.locator('.task-item').filter({ hasText: 'Finish homework' });

  await task.getByRole('button', { name: 'Mark Done' }).click();

  await expect(
    task.getByRole('button', { name: 'Mark Undone' })
  ).toBeVisible();
});

// Test 8: Filtering by category shows only matching tasks.
test('filtering by Home category shows only Home tasks', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Buy groceries');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.locator('form select').nth(1).selectOption('Home');
  await page.getByPlaceholder('What do you need to do?').fill('Clean kitchen');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.locator('.filter-sort select').first().selectOption('Home');

  await expect(page.locator('.task-item')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Clean kitchen' })
  ).toBeVisible();
});

// Test 9: A task remains after reloading the page.
test('a task remains in the list after reloading the page', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Prepare presentation');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await page.reload();

  await expect(
    page.getByRole('heading', { name: 'Prepare presentation' })
  ).toBeVisible();
});

// Test 10: The title input is cleared after creating a task.
test('the title input is cleared after creating a task', async ({ page }) => {
  const titleInput = page.getByPlaceholder('What do you need to do?');

  await titleInput.fill('Read a book');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(titleInput).toBeEmpty();
});
