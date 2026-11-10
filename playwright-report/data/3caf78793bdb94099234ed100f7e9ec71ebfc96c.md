# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: daybreak.spec.ts >> cancelling an edit does not mark the task as done
- Location: tests\daybreak.spec.ts:57:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.task-item').first().getByRole('button', { name: 'Mark Done' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.task-item').first().getByRole('button', { name: 'Mark Done' }) with timeout 5000ms
  - waiting for locator('.task-item').first().getByRole('button', { name: 'Mark Done' })

```

```yaml
- banner:
  - heading "Daybreak Tasks" [level=1]
  - paragraph: Plan your day, one task at a time
- main:
  - textbox "What do you need to do?"
  - textbox "Add a note (optional)"
  - text: Importance Category
  - combobox:
    - option "Low"
    - option "Medium" [selected]
    - option "High"
  - combobox:
    - option "Work" [selected]
    - option "Social"
    - option "Home"
    - option "Hobby"
  - button "Create Task"
  - combobox:
    - option "All categories" [selected]
    - option "Work"
    - option "Social"
    - option "Home"
    - option "Hobby"
  - combobox:
    - 'option "Priority: Low to High" [selected]'
    - 'option "Priority: High to Low"'
  - heading "Buy milk" [level=3]
  - paragraph
  - paragraph: "Importance: Medium"
  - paragraph: "Category: Work"
  - button "Mark Undone"
  - button "Delete"
  - button "Edit"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // Every test gets a fresh browser profile, so localStorage always starts empty.
  4  | test.beforeEach(async ({ page }) => {
  5  |   await page.goto('/');
  6  | });
  7  | 
  8  | test('the app loads and shows its heading', async ({ page }) => {
  9  |   await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
  10 | });
  11 | 
  12 | test('a new task appears in the list', async ({ page }) => {
  13 |   await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  14 |   await page.getByRole('button', { name: 'Create Task' }).click();
  15 | 
  16 |   await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
  17 | });
  18 | 
  19 | // Requirement 6: the title starts with a capital letter.
  20 | test('a lowercase title is saved with a capital letter', async ({ page }) => {
  21 |   await page.getByPlaceholder('What do you need to do?').fill('buy milk');
  22 |   await page.getByRole('button', { name: 'Create Task' }).click();
  23 | 
  24 |   await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
  25 | });
  26 | 
  27 | // Requirement 1: the title is required.
  28 | test('a task with an empty title is not created', async ({ page }) => {
  29 |   await page.getByRole('button', { name: 'Create Task' }).click();
  30 | 
  31 |   await expect(page.locator('.task-item')).toHaveCount(0);
  32 | });
  33 | 
  34 | // Requirement 3: a new task is not completed.
  35 | test('a new task starts as not completed', async ({ page }) => {
  36 |   await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  37 |   await page.getByRole('button', { name: 'Create Task' }).click();
  38 | 
  39 |   const task = page.locator('.task-item').filter({ hasText: 'Buy milk' });
  40 |   await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
  41 | });
  42 | 
  43 | // Delete removes only the task you clicked, even when two tasks share a title.
  44 | test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  45 |   for (let i = 0; i < 2; i++) {
  46 |     await page.getByPlaceholder('What do you need to do?').fill('Call mom');
  47 |     await page.getByRole('button', { name: 'Create Task' }).click();
  48 |   }
  49 |   await expect(page.locator('.task-item')).toHaveCount(2);
  50 | 
  51 |   await page.locator('.task-item').first().getByRole('button', { name: 'Delete' }).click();
  52 | 
  53 |   await expect(page.locator('.task-item')).toHaveCount(1);
  54 | });
  55 | 
  56 | // Cancel closes the edit form and changes nothing.
  57 | test('cancelling an edit does not mark the task as done', async ({ page }) => {
  58 |   await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  59 |   await page.getByRole('button', { name: 'Create Task' }).click();
  60 | 
  61 |   // The title moves into an input while editing, so hasText no longer matches it.
  62 |   const task = page.locator('.task-item').first();
  63 |   await task.getByRole('button', { name: 'Edit' }).click();
  64 |   await task.getByRole('button', { name: 'Cancel' }).click();
  65 | 
> 66 |   await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
     |                                                                 ^ Error: expect(locator).toBeVisible() failed
  67 | });
  68 | 
```