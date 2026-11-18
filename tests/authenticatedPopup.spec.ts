import { test, expect, Page } from '@playwright/test';

test('authenticated popup', async ({ browser }) => {
  /*
  const context = await browser.newContext();
  const page = await context.newPage();

  // Approach 1: Directly pass login along with the url
  await page.goto('https://the-internet.herokuapp.com/basic_auth');
  await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth');

  await page.waitForLoadState(); // wait for page loaded completely.

  await expect(page.locator('text=congratulations')).toBeVisible();

  await page.waitForTimeout(5000);
  */

  // Approach 2: Directly pass login along with browser context
  const context = await browser.newContext({
    httpCredentials: { username: 'admin', password: 'admin' },
  });
  const page = await context.newPage();
  await page.goto('https://the-internet.herokuapp.com/basic_auth');

  await page.waitForLoadState(); // wait for page loaded completely.

  await expect(page.locator('text=congratulations')).toBeVisible();

  await page.waitForTimeout(5000);
});
