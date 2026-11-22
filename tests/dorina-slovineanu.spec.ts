import { test, expect } from '@playwright/test';

test('the app loads and shows its heading', async ({ page }) => {
await page.goto('/');
await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
});

test('a new task appears in the list', async ({ page }) => {
await page.goto('/');
await page.getByPlaceholder('What do you need to do?').fill('Do Lab10 ASAP');
await page.getByRole('button', { name: 'Create Task' }).click();

await expect(page.getByRole('heading', { name: 'Do Lab10 ASAP' })).toBeVisible();
});