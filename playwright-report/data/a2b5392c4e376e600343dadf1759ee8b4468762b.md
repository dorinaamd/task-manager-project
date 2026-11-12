# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: grunzu_maria-beatricie.spec.ts >> the app loads and shows its heading
- Location: tests\grunzu_maria-beatricie.spec.ts:2:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByRole('heading', { name: 'Daybreak' })
Expected: "Daybreak"
Received: "Daybreak Tasks"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByRole('heading', { name: 'Daybreak' }) with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Daybreak' })
    14 × locator resolved to <h1 class="text-center text-2xl font-bold text-white tracking-wide">Daybreak Tasks</h1>
       - unexpected value "Daybreak Tasks"

```

```yaml
- heading "Daybreak Tasks" [level=1]
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 | test('the app loads and shows its heading', async ({ page }) => {
  3 |     await page.goto('/');
> 4 |     await expect(page.getByRole('heading', { name: 'Daybreak' })).toHaveText('Daybreak');
    |                                                                   ^ Error: expect(locator).toHaveText(expected) failed
  5 | });
```