import { test, expect } from '@playwright/test';

const BASE_URL = '/';
const TITLE = 'SF movie locations on the map';
const OPTION_ONE = 'A Jitney Elopement';
const OPTION_TWO = '180';

test('open page', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(TITLE);
});

test('select item', async ({ page }) => {
  await page.goto(BASE_URL);
  const select = await page.getByRole('combobox');

  await select.selectOption(OPTION_ONE);

  await expect(page).toHaveURL(new RegExp(encodeURI(OPTION_ONE)));
  await expect(await select.inputValue()).toBe(OPTION_ONE);
});

test('go to second item', async ({ page }) => {
  await page.goto(BASE_URL);
  const select = await page.getByRole('combobox');

  await select.selectOption(OPTION_ONE);
  await select.selectOption(OPTION_TWO);

  await expect(await select.inputValue()).toBe(OPTION_TWO);
});

test('go to second item and back', async ({ page }) => {
  await page.goto(BASE_URL);
  const select = await page.getByRole('combobox');

  await select.selectOption(OPTION_ONE);
  await select.selectOption(OPTION_TWO);
  await page.goBack();

  await expect(page).toHaveURL(new RegExp(encodeURI(OPTION_ONE)));
  await expect(await select.inputValue()).toBe(OPTION_ONE);
});
