import { test } from '@playwright/test';
test.only('Handle Popups', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Multiple popups
  // page.waitForEvent('popup');
  // await page.locator("#Popup").click();

  await Promise.all([page.waitForEvent('popup'), await page.locator('#PopUp').click()]);

  const allPopupWindows = context.pages(); // Returns array of pages
  console.log('Number of pages/windows: ', allPopupWindows.length); // 2

  console.log(allPopupWindows[0].url());
  console.log(allPopupWindows[1].url());

  for (const pw of allPopupWindows) {
    const title = await pw.title();
    if (title.includes('Playwright')) {
      await pw.locator('.getStarted_Sjon').click();
      await page.waitForTimeout(5000);
      await pw.close(); // This will close playwright popup window.
    }
  }

  await page.waitForTimeout(5000);
});
