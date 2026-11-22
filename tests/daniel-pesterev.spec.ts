
import { test, expect } from '@playwright/test';

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

test('a task with an empty title should not be created', async ({ page }) => {
  const taskInput = page.getByPlaceholder('What do you need to do?');

  await taskInput.fill('   ');

  await page.getByRole('button', { name: 'Create Task' }).click();

  await expect(
    page.getByRole('heading', { name: 'Daybreak Tasks' })
  ).toBeVisible();

  await expect(
    page.locator('h3').filter({ hasText: /^\s*$/ })
  ).toHaveCount(0);
});

test('a task can be deleted', async ({ page }) => {
  const taskTitle = 'Task to delete';

  await page.getByPlaceholder('What do you need to do?').fill(taskTitle);

  await page.getByRole('button', { name: 'Create Task' }).click();

  const task = page.locator('div').filter({
    has: page.getByRole('heading', { name: taskTitle, exact: true })
  }).filter({
    has: page.getByRole('button', { name: 'Delete', exact: true })
  }).last();

  await expect(
    page.getByRole('heading', { name: taskTitle })
  ).toBeVisible();

  await task.getByRole('button', { name: 'Delete' }).click();

  await expect(
    page.getByRole('heading', { name: taskTitle })
  ).toHaveCount(0);
});

test('deleting one duplicate task should keep the other', async ({ page }) => {
  const taskTitle = 'Duplicate Task';

  // Create the first task
  await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
  await page.getByRole('button', { name: 'Create Task' }).click();

  // Create the second task with the same title
  await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
  await page.getByRole('button', { name: 'Create Task' }).click();

  // Verify that both tasks exist
  const tasks = page.getByRole('heading', {
    name: taskTitle,
    exact: true
  });

  await expect(tasks).toHaveCount(2);

  // Delete one of the duplicate tasks
  const firstTask = page.locator('div').filter({
    has: tasks.first()
  }).filter({
    has: page.getByRole('button', { name: 'Delete', exact: true })
  }).last();

  await firstTask.getByRole('button', { name: 'Delete' }).click();

  // The other task should remain
  await expect(tasks).toHaveCount(1);
});
