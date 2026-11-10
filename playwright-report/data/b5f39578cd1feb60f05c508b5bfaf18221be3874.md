# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: daybreak.spec.ts >> deleting one of two same-title tasks leaves the other
- Location: tests\daybreak.spec.ts:44:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.task-item')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" locator('.task-item') with timeout 5000ms
  - waiting for locator('.task-item')
    14 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - heading "Daybreak Tasks" [level=1] [ref=e5]
    - paragraph [ref=e6]: Plan your day, one task at a time
  - main [ref=e7]:
    - generic [ref=e9]:
      - textbox "What do you need to do?" [ref=e10]
      - textbox "Add a note (optional)" [ref=e11]
      - generic [ref=e12]:
        - generic [ref=e13]: Importance
        - generic [ref=e14]: Category
      - generic [ref=e15]:
        - combobox [ref=e16]:
          - option "Low"
          - option "Medium" [selected]
          - option "High"
        - combobox [ref=e17]:
          - option "Work" [selected]
          - option "Social"
          - option "Home"
          - option "Hobby"
      - button "Create Task" [ref=e19]
    - generic [ref=e20]:
      - combobox [ref=e21]:
        - option "All categories" [selected]
        - option "Work"
        - option "Social"
        - option "Home"
        - option "Hobby"
      - combobox [ref=e22]:
        - 'option "Priority: Low to High" [selected]'
        - 'option "Priority: High to Low"'
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
> 53 |   await expect(page.locator('.task-item')).toHaveCount(1);
     |                                            ^ Error: expect(locator).toHaveCount(expected) failed
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
  66 |   await expect(task.getByRole('button', { name: 'Mark Done' })).toBeVisible();
  67 | });
  68 | 
```