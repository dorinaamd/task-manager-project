import { test, expect } from '@playwright/test';
test('the app loads and shows its heading', async ({ page }) => {
await page.goto('/');
await expect(page.getByRole('heading', { name: 'Daybreak Tasks' })).toBeVisible();
});

test('a new task appears in the list', async ({ page }) => {
await page.goto('/');
await page.getByPlaceholder('What do you need to do?').fill('Buy milk');
await page.getByRole('button', { name: 'Create Task' }).click();

await expect(page.getByRole('heading', { name: 'Buy milk' })).not.toBeVisible();
});