import { test, expect } from '@playwright/test';
test('the app loads and shows its heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Daybreak' })).toHaveText('Daybreak');
});
