import { test, expect } from '@playwright/test';

test('Autowaiting and forcing', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  /*
  // Hard Assertions
  await expect(page).toHaveTitle('Demo Web Shop');
  await expect(page).toHaveURL('https://demowebshop.tricentis.com/');

  const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect(logo).toBeVisible();
  */

  // soft assertions
  await expect.soft(page).toHaveTitle('Demo Web Shop2'); // failed
  await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');

  const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
  await expect(logo).toBeVisible();

  await page.waitForTimeout(5000);
});
