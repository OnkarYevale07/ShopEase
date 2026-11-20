import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('mobile phones');
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  await page.getByRole('link', { name: 'REDMI Turbo 5 (8GB + 256GB)' }).first().click();
  await page.getByRole('button', { name: 'Open All Categories Menu' }).click();
  await page.getByRole('link', { name: 'Bestsellers' }).click();
  page.video();
});
