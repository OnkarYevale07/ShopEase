import { test, chromium, expect, firefox } from '@playwright/test';

// Browser ---> Context ---> Page

// Browser ---> Chromium,firefox,webkit

// Contexts ---> we can have multiple contexts for multiple users/apps for the same browser provide a way to operate multiple independent browser sessions.
// Page ---> New Tab, Window, Popup
test.only('Browser Context Demo', async ({}) => {
  const browser = await chromium.launch(); // Create Browser
  const context = await browser.newContext(); // Create Context

  const browser2 = await firefox.launch();
  const context2 = await browser2.newContext();

  // Creating 2 Pages
  const page1 = await context.newPage();
  const page2 = await context2.newPage();
  console.log('No of pages created: ', context.pages().length); // 2

  await page1.goto('https://playwright.dev/');
  await expect(page1).toHaveTitle(
    'Fast and reliable end-to-end testing for modern web apps | Playwright',
  );
  await page2.goto('https://www.selenium.dev/');
  await expect(page2).toHaveTitle('Selenium');

  await page1.waitForTimeout(5000);
  await page2.waitForTimeout(5000);
});
