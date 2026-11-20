import { test, expect } from '@playwright/test';

test('Screenshots demo', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  const timestamp = Date.now();

  // Page Screenshot
  //   await page.screenshot({ path: 'screenshots/' + 'homepage' + timestamp + '.png' });

  // Full Page Screenshot
  //   await page.screenshot({ path: 'screenshots/' + 'homepage' + timestamp + '.png', fullPage: true });

  const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
  logo.screenshot({ path: 'screenshots/' + 'logo' + timestamp + '.png' });

  await page
    .locator("img[alt='Tricentis Demo Web Shop']")
    .screenshot({ path: 'screenshots/' + 'logo' + timestamp + '.png' });
});
