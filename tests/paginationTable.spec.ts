import { test, expect, Locator } from '@playwright/test';
import { match } from 'node:assert';

// test('Read data from all the table pages', async ({ page }) => {
//   await page.goto('https://datatables.net/examples/core/basic_init/zero_configuration.html');
//   let hasMorePages = true;

//   while (hasMorePages) {
//     const rows = await page.locator('#example tbody tr').all();

//     for (let row of rows) {
//       console.log(await row.innerText());
//     }

//     const nextButton: Locator = page.locator("button[aria-label='Next']");
//     const isDisabled = await nextButton.getAttribute('class');
//     if (isDisabled?.includes('disabled')) {
//       hasMorePages = false;
//     } else {
//       await nextButton.click();
//     }
//   }
// });

// test('Filter the rows and check the rows count', async ({ page }) => {
//   await page.goto('https://datatables.net/examples/core/basic_init/zero_configuration.html');

//   const dropdown: Locator = page.locator('#dt-length-0');
//   await dropdown.selectOption({ label: '25' });

//   // Approach - 1
//   const rows1 = await page.locator('#example tbody tr').all();
//   expect(rows1.length).toBe(25); // Assertion

//   // Approach - 2
//   const rows2 = page.locator('#example tbody tr');
//   await expect(rows2).toHaveCount(25);
// });

// test.only('search for specific data in a table', async ({ page }) => {
//   await page.goto('https://datatables.net/examples/core/basic_init/zero_configuration.html');

//   const searchBox: Locator = page.locator('#dt-search-0');
//   await searchBox.fill('Paul Byrd');

//   await page.waitForTimeout(5000);
//   const rows = await page.locator('#example tbody tr').all();
//   if (rows.length >= 1) {
//     let matchFound = false;
//     for (let row of rows) {
//       const text = await row.innerText();
//       if (text.includes('Paul Byrd')) {
//         console.log('Record exist - found');
//         console.log(await row.innerText());
//         matchFound = true;
//         break;
//       }
//     }
//     // expect(matchFound).toBe(true);
//     expect(matchFound).toBeTruthy();
//   } else {
//     console.log('No Rows Found With search Text');
//   }
// });
