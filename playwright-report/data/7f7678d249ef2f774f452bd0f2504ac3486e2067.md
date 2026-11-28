# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: belenichi-iulian.spec.ts >> deleting one of two same-title tasks leaves the other
- Location: tests/belenichi-iulian.spec.ts:34:1

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
  14  |   await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
  15  | });
  16  | 
  17  | test('a new task appears in the list', async ({ page }) => {
  18  |   await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  19  |   await page.getByRole('button', { name: 'Create Task' }).click();
  20  |   await expect(page.getByRole('heading', { name: 'Buy milk' })).toBeVisible();
  21  | });
  22  | 
  23  | test('importance defaults to Medium', async ({ page }) => {
  24  |   await expect(page.locator('form select').first()).toHaveValue('Medium');
  25  | });
  26  | 
  27  | test('marking a task done shows the Mark Undone button', async ({ page }) => {
  28  |   await page.getByPlaceholder('What do you need to do?').fill('Pay bills');
  29  |   await page.getByRole('button', { name: 'Create Task' }).click();
  30  |   await page.getByRole('button', { name: 'Mark Done' }).click();
  31  |   await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
  32  | });
  33  | 
  34  | test('deleting one of two same-title tasks leaves the other', async ({ page }) => {
  35  |   for (let i = 0; i < 2; i++) {
  36  |     await page.getByPlaceholder('What do you need to do?').fill('Call mom');
  37  |     await page.getByRole('button', { name: 'Create Task' }).click();
  38  |   }
  39  |   await expect(page.locator('.task-item')).toHaveCount(2);
  40  |   await page.locator('.task-item').first()
  41  |     .getByRole('button', { name: 'Delete' }).click();
> 42  |   await expect(page.locator('.task-item')).toHaveCount(1);
      |                                            ^ Error: expect(locator).toHaveCount(expected) failed
  43  | });
  44  | 
  45  | 
  46  | // Teste indiviuale
  47  | // R6: Title starts with a capital letter
  48  | test('a lowercase title is saved with a capital first letter', async ({ page }) => {
  49  |   await page.getByPlaceholder('What do you need to do?').fill('buy bread');
  50  |   await page.getByRole('button', { name: 'Create Task' }).click();
  51  |   await expect(page.getByRole('heading', { name: 'Buy bread' })).toBeVisible();
  52  | });
  53  | 
  54  | // R4 + R5: after creating a task the form goes back to its defaults
  55  | test('the form resets to its defaults after a task is created', async ({ page }) => {
  56  |   const form = page.locator('form');
  57  |   await page.getByPlaceholder('What do you need to do?').fill('Plan trip');
  58  |   await form.locator('select').first().selectOption('High');
  59  |   await form.locator('select').nth(1).selectOption('Hobby');
  60  |   await page.getByRole('button', { name: 'Create Task' }).click();
  61  | 
  62  |   await expect(page.getByPlaceholder('What do you need to do?')).toBeEmpty();
  63  |   await expect(form.locator('select').first()).toHaveValue('Medium');
  64  |   await expect(form.locator('select').nth(1)).toHaveValue('Work');
  65  | });
  66  | 
  67  | // R2: Description is optional, and when given it is shown on the card
  68  | test('the description appears on the task card', async ({ page }) => {
  69  |   await page.getByPlaceholder('What do you need to do?').fill('Dentist');
  70  |   await page.getByPlaceholder('Add a note (optional)').fill('Tuesday at 10:00');
  71  |   await page.getByRole('button', { name: 'Create Task' }).click();
  72  | 
  73  |   const card = page.locator('.task-item').filter({ hasText: 'Dentist' });
  74  |   await expect(card).toContainText('Tuesday at 10:00');
  75  | });
  76  | 
  77  | // Feature 4: a completed task can be marked incomplete again
  78  | test('Mark Undone returns a done task to not done', async ({ page }) => {
  79  |   await page.getByPlaceholder('What do you need to do?').fill('Water plants');
  80  |   await page.getByRole('button', { name: 'Create Task' }).click();
  81  | 
  82  |   const card = page.locator('.task-item').filter({ hasText: 'Water plants' });
  83  |   await card.getByRole('button', { name: 'Mark Done' }).click();
  84  |   await card.getByRole('button', { name: 'Mark Undone' }).click();
  85  | 
  86  |   await expect(card.getByRole('button', { name: 'Mark Done' })).toBeVisible();
  87  |   await expect(card.getByRole('button', { name: 'Mark Undone' })).toBeHidden();
  88  | });
  89  | 
  90  | // Feature 6: sort by importance. "Low to High" must show Low, Medium, High.
  91  | // Expected to FAIL: the app sorts the words alphabetically (High, Low, Medium).
  92  | test('sorting Low to High orders tasks by importance', async ({ page }) => {
  93  |   const form = page.locator('form');
  94  |   const tasks: [string, string][] = [
  95  |     ['Medium task', 'Medium'],
  96  |     ['High task', 'High'],
  97  |     ['Low task', 'Low'],
  98  |   ];
  99  |   for (const [title, importance] of tasks) {
  100 |     await page.getByPlaceholder('What do you need to do?').fill(title);
  101 |     await form.locator('select').first().selectOption(importance);
  102 |     await page.getByRole('button', { name: 'Create Task' }).click();
  103 |   }
  104 |   await expect(page.locator('.task-item')).toHaveCount(3);
  105 | 
  106 |   await page.locator('.filter-sort select').nth(1).selectOption('asc');
  107 |   await expect(page.locator('.task-item h3')).toHaveText(['Low task', 'Medium task', 'High task']);
  108 | });
  109 | 
```