import { test, expect } from '@playwright/test';

test('Autowaiting and forcing', async ({ page }) => {
  /* Set Custom Timeout for this test */
  test.setTimeout(50000); // 50 secs
  // test.slow() // 90secs {default is 30 secs}
  await page.goto('https://demowebshop.tricentis.com/');

  // Assertions : Autowait works (Timeout for only specific assertions)
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/', { timeout: 10000 });
  await expect(page.locator('text=Welcome to our store')).toBeVisible({ timeout: 10000 });

  // Actions : Autowait works
  await page.locator('#small-searchterms').fill('Laptop', { force: true }); // Search box - Force action
  await page.locator('.button-1.search-box-button').click({ force: true }); // clicking on search button -Force action
});
