import { test, expect, Locator } from '@playwright/test';

test.only('Verify Chrome CPU load in dynamic table', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/dynamic-table');

  const table: Locator = page.locator('table.table tbody');
  await expect(table).toBeVisible();

  // Select all the rows, then find number of rows
  const rows: Locator[] = await table.locator('tr').all();
  console.log('Number of rows in a table: ', rows.length);
  expect(rows).toHaveLength(4);

  // 1. For Chrome process get value of CPU load.
  // Read each row to check chrome presence
  let cpuLoad = '';
  for (const row of rows) {
    const processName: string = await row.locator('td').nth(0).innerText();
    if (processName === 'Chrome') {
      // cpuLoad = await row.locator('td:has-text("%")').innerText(); // CSS Syntax for locator
      cpuLoad = await row.locator('td', { hasText: '%' }).innerText(); // Playwright Syntax for locator
      console.log('CPU Load of Chrome: ', cpuLoad);
      break;
    }
  }

  // 2. Compare it with value in the yellow label.
  let yellowBoxText: string = await page.locator('#chrome-cpu').innerText();
  console.log('Chrome CPU load from yellow box: ', yellowBoxText);

  if (yellowBoxText.includes(cpuLoad)) {
    console.log('CPU Load of chrome is equal.');
  } else {
    console.log('CPU Load of Chrome is not equal.');
  }

  expect(yellowBoxText).toContain(cpuLoad);
  await page.waitForTimeout(5000);
});
