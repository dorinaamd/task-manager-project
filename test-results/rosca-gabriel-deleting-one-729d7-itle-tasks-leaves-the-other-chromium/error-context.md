# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rosca-gabriel.spec.ts >> deleting one of two same-title tasks leaves the other
- Location: tests\rosca-gabriel.spec.ts:42:1

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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.use({
  4   |   screenshot: 'only-on-failure',
  5   |   trace: 'retain-on-failure',
  6   |   video: 'retain-on-failure',
  7   | });
  8   | 
  9   | test.beforeEach(async ({ page }) => {
  10  |   await page.goto('/');
  11  | });
  12  | 
  13  | test('the app loads and shows its heading', async ({ page }) => {
  14  |   await expect(
  15  |     page.getByRole('heading', { name: 'Daybreak Tasks' })
  16  |   ).toBeVisible();
  17  | });
  18  | 
  19  | test('a new task appears in the list', async ({ page }) => {
  20  |   await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  21  |   await page.getByRole('button', { name: 'Create Task' }).click();
  22  |   await expect(
  23  |     page.getByRole('heading', { name: 'Buy milk' })
  24  |   ).toBeVisible();
  25  | });
  26  | 
  27  | // R4: Importance defaults to Medium. 
  28  | test('importance is Medium by default', async ({ page }) => {
  29  |   await expect(
  30  |     page.locator('form select').first()
  31  |   ).toHaveValue('Medium');
  32  | });
  33  | 
  34  | // R5: Category defaults to Work.
  35  | test('category is Work by default', async ({ page }) => {
  36  |   await expect(
  37  |     page.locator('form select').nth(1)
  38  |   ).toHaveValue('Work');
  39  | });
  40  | 
  41  | // Delete removes only the task you clicked.
  42  | test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  43  |   for (let i = 0; i < 2; i++) {
  44  |     await page.getByPlaceholder('What do you need to do?').fill('Call mom');
  45  |     await page.getByRole('button', { name: 'Create Task' }).click();
  46  |   }
  47  | 
  48  |   await expect(page.locator('.task-item')).toHaveCount(2);
  49  | 
  50  |   await page.locator('.task-item').first()
  51  |     .getByRole('button', { name: 'Delete' }).click();
  52  | 
> 53  |   await expect(page.locator('.task-item')).toHaveCount(1);
      |                                            ^ Error: expect(locator).toHaveCount(expected) failed
  54  | });
  55  | 
  56  | 
  57  | // Test 6: A task can be created with High importance and Home category.
  58  | test('a task can be created with High importance and Home category', async ({ page }) => {
  59  |   await page.locator('form select').first().selectOption('High');
  60  |   await page.locator('form select').nth(1).selectOption('Home');
  61  | 
  62  |   await page.getByPlaceholder('What do you need to do?').fill('Clean my room');
  63  |   await page.getByRole('button', { name: 'Create Task' }).click();
  64  | 
  65  |   const task = page.locator('.task-item').filter({ hasText: 'Clean my room' });
  66  | 
  67  |   await expect(task).toContainText('Importance: High');
  68  |   await expect(task).toContainText('Category: Home');
  69  | });
  70  | 
  71  | // Test 7: A task can be marked as done.
  72  | test('a task can be marked as done', async ({ page }) => {
  73  |   await page.getByPlaceholder('What do you need to do?').fill('Finish homework');
  74  |   await page.getByRole('button', { name: 'Create Task' }).click();
  75  | 
  76  |   const task = page.locator('.task-item').filter({ hasText: 'Finish homework' });
  77  | 
  78  |   await task.getByRole('button', { name: 'Mark Done' }).click();
  79  | 
  80  |   await expect(
  81  |     task.getByRole('button', { name: 'Mark Undone' })
  82  |   ).toBeVisible();
  83  | });
  84  | 
  85  | // Test 8: Filtering by category shows only matching tasks.
  86  | test('filtering by Home category shows only Home tasks', async ({ page }) => {
  87  |   await page.getByPlaceholder('What do you need to do?').fill('Buy groceries');
  88  |   await page.getByRole('button', { name: 'Create Task' }).click();
  89  | 
  90  |   await page.locator('form select').nth(1).selectOption('Home');
  91  |   await page.getByPlaceholder('What do you need to do?').fill('Clean kitchen');
  92  |   await page.getByRole('button', { name: 'Create Task' }).click();
  93  | 
  94  |   await page.locator('.filter-sort select').first().selectOption('Home');
  95  | 
  96  |   await expect(page.locator('.task-item')).toHaveCount(1);
  97  |   await expect(
  98  |     page.getByRole('heading', { name: 'Clean kitchen' })
  99  |   ).toBeVisible();
  100 | });
  101 | 
  102 | // Test 9: A task remains after reloading the page.
  103 | test('a task remains in the list after reloading the page', async ({ page }) => {
  104 |   await page.getByPlaceholder('What do you need to do?').fill('Prepare presentation');
  105 |   await page.getByRole('button', { name: 'Create Task' }).click();
  106 | 
  107 |   await page.reload();
  108 | 
  109 |   await expect(
  110 |     page.getByRole('heading', { name: 'Prepare presentation' })
  111 |   ).toBeVisible();
  112 | });
  113 | 
  114 | // Test 10: The title input is cleared after creating a task.
  115 | test('the title input is cleared after creating a task', async ({ page }) => {
  116 |   const titleInput = page.getByPlaceholder('What do you need to do?');
  117 | 
  118 |   await titleInput.fill('Read a book');
  119 |   await page.getByRole('button', { name: 'Create Task' }).click();
  120 | 
  121 |   await expect(titleInput).toBeEmpty();
  122 | });
  123 | 
```