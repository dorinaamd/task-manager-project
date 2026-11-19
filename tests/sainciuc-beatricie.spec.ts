import { test, expect, type Page } from '@playwright/test';

async function createTask(
  page: Page,
  title: string,
  importance: 'Low' | 'Medium' | 'High' = 'Medium',
  category: 'Work' | 'Home' | 'Hobby' | 'Social' = 'Work'
) {
  await page.getByPlaceholder('What do you need to do?').fill(title);
  await page.locator('form select').nth(0).selectOption(importance);
  await page.locator('form select').nth(1).selectOption(category);
  await page.getByRole('button', { name: 'Create Task' }).click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('TC01 - Nu permite sarcina fara titlu', async ({ page }) => {
  await page.getByRole('button', { name: 'Create Task' }).click();
  await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0);
});

test('TC02 - Titlul incepe cu litera mare', async ({ page }) => {
  await createTask(page, 'cumparaturi');
  await expect(page.getByText('Cumparaturi', { exact: true })).toBeVisible();
});

test('TC03 - Editarea titlului unei sarcini', async ({ page }) => {
  await createTask(page, 'Cumparaturi');
  await page.getByRole('button', { name: 'Edit' }).click();

  await page.locator('input[value="Cumparaturi"]').fill('Teme pentru facultate');
  await page.getByRole('button', { name: 'Save Changes' }).click();

  await expect(page.getByText('Teme pentru facultate')).toBeVisible();
});

test('TC04 - Stergerea unei sarcini', async ({ page }) => {
  await createTask(page, 'Tema');
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Tema', { exact: true })).toHaveCount(0);
});

test('TC05 - Marcarea unei sarcini ca finalizata', async ({ page }) => {
  await createTask(page, 'Tema');
  await page.getByRole('button', { name: 'Mark Done' }).click();
  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
  await page.getByRole('button', { name: 'Mark Undone' }).click();
  await expect(page.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});

test('TC06 - Filtrarea dupa categorie', async ({ page }) => {
  await createTask(page, 'Tema', 'Medium', 'Work');
  await createTask(page, 'Curatenie', 'Low', 'Home');

  await page.locator('.filter-sort select').first().selectOption('Work');

  await expect(page.getByText('Tema', { exact: true })).toBeVisible();
  await expect(page.getByText('Curatenie', { exact: true })).toHaveCount(0);
});

test('TC07 - Sortarea dupa importanta', async ({ page }) => {
  await createTask(page, 'Sarcina low', 'Low');
  await createTask(page, 'Sarcina high', 'High');
  await createTask(page, 'Sarcina medium', 'Medium');

  await page.locator('.filter-sort select').nth(1).selectOption('asc');

  const titles = await page.locator('main h3').allTextContents();
  expect(titles).toEqual([
    'Sarcina low',
    'Sarcina medium',
    'Sarcina high'
  ]);
});

test('TC08 - Nu permite titlul format doar din spatii', async ({ page }) => {
  await createTask(page, '     ');
  await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(0);
});

test('TC09 - Valorile implicite sunt corecte', async ({ page }) => {
  await expect(page.locator('form select').nth(0)).toHaveValue('Medium');
  await expect(page.locator('form select').nth(1)).toHaveValue('Work');

  await createTask(page, 'Tema');
  await expect(page.getByRole('button', { name: 'Mark Done' })).toBeVisible();
});

test('TC10 - Sarcinile raman dupa refresh', async ({ page }) => {
  await createTask(page, 'Tema');
  await page.reload();
  await expect(page.getByText('Tema', { exact: true })).toBeVisible();
});

test('TC11 - Stergerea unei singure sarcini cu titlu duplicat', async ({ page }) => {
  await createTask(page, 'Test duplicat', 'Medium', 'Work');
  await createTask(page, 'Test duplicat', 'High', 'Home');

  // Stergem doar prima sarcina
  await page.getByRole('button', { name: 'Delete' }).first().click();

  // A doua sarcina trebuie sa ramana
  await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(1);
});

test('TC12 - Modificarile se pastreaza dupa refresh', async ({ page }) => {
  await createTask(page, 'Test salvare');

  // Modificam titlul
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.locator('input[value="Test salvare"]').fill('Test modificat');
  await page.getByRole('button', { name: 'Save Changes' }).click();

  // Verificam modificarea
  await expect(page.getByText('Test modificat', { exact: true })).toBeVisible();

  // Reincarcam pagina
  await page.reload();

  // Titlul modificat trebuie sa ramana salvat
  await expect(page.getByText('Test modificat', { exact: true })).toBeVisible();
});

test('TC13 - Finalizarea sarcinii se pastreaza dupa refresh', async ({ page }) => {
  await createTask(page, 'Test finalizare');

  await page.getByRole('button', { name: 'Mark Done' }).click();

  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();

  await page.reload();

  await expect(page.getByRole('button', { name: 'Mark Undone' })).toBeVisible();
});