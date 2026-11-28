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

test('importance defaults to Medium', async ({ page }) => {
  await expect(page.locator('form select').first()).toHaveValue('Medium');
});

test('marking a task done shows the Mark Undone button', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Pay bills');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await page.getByRole('button', { name: 'Mark Done' }).click();
  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
});

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


// Teste indiviuale
// R6: Title starts with a capital letter
test('a lowercase title is saved with a capital first letter', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('buy bread');
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByRole('heading', { name: 'Buy bread' })).toBeVisible();
});

// R4 + R5: after creating a task the form goes back to its defaults
test('the form resets to its defaults after a task is created', async ({ page }) => {
  const form = page.locator('form');
  await page.getByPlaceholder('What do you need to do?').fill('Plan trip');
  await form.locator('select').first().selectOption('High');
  await form.locator('select').nth(1).selectOption('Hobby');
  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(page.getByPlaceholder('What do you need to do?')).toBeEmpty();
  await expect(form.locator('select').first()).toHaveValue('Medium');
  await expect(form.locator('select').nth(1)).toHaveValue('Work');
});

// R2: Description is optional, and when given it is shown on the card
test('the description appears on the task card', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Dentist');
  await page.getByPlaceholder('Add a note (optional)').fill('Tuesday at 10:00');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const card = page.locator('.task-item').filter({ hasText: 'Dentist' });
  await expect(card).toContainText('Tuesday at 10:00');
});

// Feature 4: a completed task can be marked incomplete again
test('Mark Undone returns a done task to not done', async ({ page }) => {
  await page.getByPlaceholder('What do you need to do?').fill('Water plants');
  await page.getByRole('button', { name: 'Create Task' }).click();

  const card = page.locator('.task-item').filter({ hasText: 'Water plants' });
  await card.getByRole('button', { name: 'Mark Done' }).click();
  await card.getByRole('button', { name: 'Mark Undone' }).click();

  await expect(card.getByRole('button', { name: 'Mark Done' })).toBeVisible();
  await expect(card.getByRole('button', { name: 'Mark Undone' })).toBeHidden();
});

// Feature 6: sort by importance. "Low to High" must show Low, Medium, High.
// Expected to FAIL: the app sorts the words alphabetically (High, Low, Medium).
test('sorting Low to High orders tasks by importance', async ({ page }) => {
  const form = page.locator('form');
  const tasks: [string, string][] = [
    ['Medium task', 'Medium'],
    ['High task', 'High'],
    ['Low task', 'Low'],
  ];
  for (const [title, importance] of tasks) {
    await page.getByPlaceholder('What do you need to do?').fill(title);
    await form.locator('select').first().selectOption(importance);
    await page.getByRole('button', { name: 'Create Task' }).click();
  }
  await expect(page.locator('.task-item')).toHaveCount(3);

  await page.locator('.filter-sort select').nth(1).selectOption('asc');
  await expect(page.locator('.task-item h3')).toHaveText(['Low task', 'Medium task', 'High task']);
});
