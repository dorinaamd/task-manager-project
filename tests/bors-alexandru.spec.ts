import { test, expect } from '@playwright/test';

// Every test gets a fresh browser profile, so localStorage always starts empty.
test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the app loads and shows its heading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
});

test('a new task can be created', async ({ page }) => {
    const taskTitle = 'Buy milk';

    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify that the task is now visible
    await expect(page.getByRole('heading', { name: taskTitle })).toBeVisible();    
});

test('an existing task can be marked as complete', async ({ page }) => {
    const taskTitle = 'Buy milk';

    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Indetify the task    
    const task = page.locator('.task-item').filter({ hasText: taskTitle }); 

    // Press the done button
    await task.getByRole('button', { name: 'Mark Done' }).click();
    // Verify that the task is now marked as done
    await expect(task.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
});

test('an existing task can be deleted and doesnt reappear after reload', async ({ page }) => {
    const taskTitle = 'Buy milk';
    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Identify the task
    const task = page.locator('.task-item').filter({ hasText: taskTitle });

    // Press the delete button
    await task.getByRole('button', { name: 'Delete' }).click();
    // Verify that the task is no longer visible
    await expect(task).not.toBeVisible();
    page.reload();

    // Verify that the task is still not visible after reload
    await expect(task).not.toBeVisible();
});

test('a task with an empty title is not created', async ({ page }) => {
    // Attempt to create a task with an empty title
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify that the task is not created
    await expect(page.getByRole('heading', { name: 'New Task' })).not.toBeVisible();
});

test('a lowercase title is saved with a capital letter', async ({ page }) => {
    const taskTitle = 'buy milk';
    const expectedTitle = 'Buy milk';

    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify that the task is saved with a capital letter
    await expect(page.getByRole('heading', { name: expectedTitle })).toBeVisible();
});

test ('a tast with a title with spaces at the beginning and end is saved with the spaces trimmed', async ({ page }) => {
    const taskTitle = '   buy milk   ';
    const expectedTitle = 'Buy milk';
    
    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify that the task is saved with a capital letter and trimmed spaces
    await expect(page.getByRole('heading', { name: expectedTitle })).toBeVisible();
});

test('a new task starts as not completed', async ({ page }) => {
    const taskTitle = 'Buy milk';
    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();
    
    // Identify the task
    const task = page.locator('.task-item').filter({ hasText: taskTitle });
    
    // Verify that the task is not completed
    await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});

test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
    const taskTitle = 'Call mom';
    // Create two tasks with the same title
    for (let i = 0; i < 2; i++) {
        await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
        await page.getByRole('button', { name: 'Create Task' }).click();
    }
    // Verify that there are two tasks with the same title
    await expect(page.locator('.task-item')).toHaveCount(2);

    // Identify the first task
    const firstTask = page.locator('.task-item').first();

    // Press the delete button on the first task
    await firstTask.getByRole('button', { name: 'Delete' }).click();

    // Verify that there is only one task left
    await expect(page.locator('.task-item')).toHaveCount(1);
});

test ('you cannot createa a task with only spaces in the title', async ({ page }) => {
    // Attempt to create a task with only spaces in the title
    await page.getByPlaceholder('What do you need to do?').fill('   ');
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Verify that the task is not created
    await expect(page.locator('.task-item')).toHaveCount(0);
});

test('cancelling an edit does not mark the task as done', async ({ page }) => {
    const taskTitle = 'Buy milk';
    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();
    // Identify the task
    const task = page.locator('.task-item').first();

    // Press the edit button
    await task.getByRole('button', { name: 'Edit' }).click();

    // Press the cancel button
    await task.getByRole('button', { name: 'Cancel' }).click();
    
    // Verify that the task is still not completed
    await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});

test('editing a task title to be empty does not change the title', async ({ page }) => {
    const taskTitle = 'Buy milk';

    // Create the task
    await page.getByPlaceholder('What do you need to do?').fill(taskTitle);
    await page.getByRole('button', { name: 'Create Task' }).click();

    // Identify the task
    const task = page.locator('.task-item').first();

    // Press the edit button
    await task.getByRole('button', { name: 'Edit' }).click();

    // Attempt to change the title to be empty
    await task.getByPlaceholder('Title').fill('');
    await task.getByRole('button', { name: 'Save' }).click();

    // Verify that the task title is still the original title
    await expect(task).toContainText(taskTitle);
});
