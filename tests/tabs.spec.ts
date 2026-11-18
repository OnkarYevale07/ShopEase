import { chromium, test } from '@playwright/test';
test.only('Handle tabs', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Creating 1 page
  const parentPage = await context.newPage();

  await parentPage.goto('https://testautomationpractice.blogspot.com');

  // These two statements should go parallely
  //   context.waitForEvent('page'); // pending, fulfilled, rejected
  //   parentPage.locator("button:has-text('New Tab')").click(); // opens new tab/new page

  const [childPage] = await Promise.all([
    context.waitForEvent('page'),
    parentPage.locator("button:has-text('New Tab')").click(),
  ]);

  // Approach 1: Switch between pages and get titles
  const pages = context.pages(); // returns an array
  console.log('Number of pages created: ', pages.length);

  //   console.log('Title of the parent page: ', await pages[0].title());
  //   console.log('Title of the child page: ', await pages[1].title());

  // Approach 2: Alternate
  console.log('Title of the parent page: ', await parentPage.title());
  console.log('Title of the child page: ', await childPage.title());
});
