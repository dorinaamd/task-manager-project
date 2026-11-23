# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripacNicoleta.spec.ts >> a new task appears in the list
- Location: tests\TripacNicoleta.spec.ts:7:1

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  getByRole('heading', { name: 'Buy milk' })
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" getByRole('heading', { name: 'Buy milk' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Buy milk' })
    14 × locator resolved to <h3 class="text-lg font-semibold">Buy milk</h3>
       - unexpected value "visible"

```

```yaml
- heading "Buy milk" [level=3]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | test('the app loads and shows its heading', async ({ page }) => {
  3  | await page.goto('/');
  4  | await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
  5  | });
  6  | 
  7  | test('a new task appears in the list', async ({ page }) => {
  8  | await page.goto('/');
  9  | await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
  10 | await page.getByRole('button', { name: 'Create Task' }).click();
  11 | 
> 12 | await expect(page.getByRole('heading', { name: 'Buy milk' })).not.toBeVisible();
     |                                                                   ^ Error: expect(locator).not.toBeVisible() failed
  13 | });
```