import { test, expect, Locator } from '@playwright/test';

// test.only('Single Select Dropdown', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

//   /*
//   // 1. Here are 4 Ways to select an option from the dropdown.
//   await page.locator('#country').selectOption('india'); // By Using Visible Text
//   await page.locator('#country').selectOption({ value: 'india' }); // By Using Value Attribe
//   await page.locator('#country').selectOption({label:'india'}); // By Using Label
//   const selectedValue = await page.locator('#country').selectOption({ index: 9 }); // By Using Index
// */

//   /*
//   // 2. Check the number of options in the dropdown (Count)
//   const dropdownOptions: Locator = page.locator('#country > option');
//   await expect(dropdownOptions).toHaveCount(10);
// */

//   // 3. Check an Option present in the dropdown
//   const dropdownOptions: Locator = page.locator('#country > option');
//   const optionText: string[] = (await dropdownOptions.allTextContents()).map((text) => text.trim());
//   expect(optionText).toContain('Japan'); // check if the array contains "Japan"

//   // 4. Print all the options from dropdown list.
//   for (const option of optionText) {
//     console.log(option);
//   }

//   await page.waitForTimeout(5000);
// });

// test.only('Multi Select Dropdown', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

// 1. Here are 4 Ways to select an options from the dropdown.
// await page.locator('#colors').selectOption(['Red','Blue','Green']); // By Using Visible Text
// await page.locator('#colors').selectOption(['red', 'blue', 'green']); // By Using Value
// await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'},{label:'Yellow'}]); // By Using Label
// await page.locator('#colors').selectOption([{ index: 0 }, { index: 2 }, { index: 4 }]); // By Using Index

//   // 2. Check the number of options in the dropdown (Count)
//   const dropdownOptions: Locator = page.locator('#colors>option');
//   await expect(dropdownOptions).toHaveCount(7);

//   // 3. Check an Option present in the dropdown
//   const dropdownOptions: Locator = page.locator('#colors > option');
//   const optionText: string[] = (await dropdownOptions.allTextContents()).map((text) => text.trim());
//   expect(optionText).toContain('Green'); // check if the array contains "Green"

// // 4. Print all the options from dropdown list.
//   const dropdownOptions: Locator = page.locator('#colors>option');
//   const optionText: string[] = (await dropdownOptions.allTextContents()).map((text) => text.trim());
//   for (const option of optionText) {
//     console.log(option);
//   }
// });

// test.only('Sorted Select Dropdown', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

//   //   const dropdownOptions: Locator = page.locator('#colors > option'); // Unsorted List
//   const dropdownOptions: Locator = page.locator('#animals > option'); // Sorted List
//   const optionText: string[] = (await dropdownOptions.allTextContents()).map((text) => text.trim());

//   const originalList: string[] = [...optionText];
//   const sortedList: string[] = [...optionText].sort();

//   expect(originalList).toEqual(sortedList);
// });

// test.only('Verify dropdown contains duplicates', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

//   //   const dropdownOptions: Locator = page.locator('#colors>option'); // Having Duplicates
//   const dropdownOptions: Locator = page.locator('#animals>option'); // Not Having Duplicates

//   const optionText: string[] = (await dropdownOptions.allTextContents()).map((text) => text.trim());

//   const mySet = new Set<string>(); // Duplicates not allowed
//   const duplicates: string[] = []; // Allowed Duplicates

//   for (const text of optionText) {
//     if (mySet.has(text)) {
//       duplicates.push(text);
//     } else {
//       mySet.add(text);
//     }
//   }

//   console.log('Duplicate Options are: ===>', duplicates);
//   expect(duplicates.length).toBe(0);
// });

// test.only('Verify the sort order with order by dropdown', async ({ page }) => {
//   await page.goto('https://bstackdemo.com/');

//   const sortDropdown = page.locator('.sort select');
//   await sortDropdown.selectOption('lowestprice');
//   await expect(sortDropdown).toHaveValue('lowestprice');

//   const priceLocator = page.locator('.shelf-item__price .val');

//   // Wait until the list is actually sorted
//   await expect(async () => {
//     const texts = await priceLocator.allTextContents();
//     const prices = texts.map((t) => parseFloat(t.replace(/[^0-9.]/g, '')));
//     expect(prices.length).toBeGreaterThan(0);
//     expect(prices).toEqual([...prices].sort((a, b) => a - b));
//   }).toPass();

//   // Now it is safe to read names and prices
//   const names = await page.locator('.shelf-item__title').allTextContents();
//   const priceTexts = await priceLocator.allTextContents();

//   const products = names.map((name, i) => ({
//     name: name.trim(),
//     price: parseFloat(priceTexts[i].replace(/[^0-9.]/g, '')),
//   }));

//   const lowest = products[0];
//   const highest = products[products.length - 1];

//   console.log('Lowest :', lowest);
//   console.log('Highest:', highest);

//   expect(lowest.price).toBeLessThanOrEqual(highest.price);

//   await page.waitForTimeout(5000);
// });

// test.only('AutoSuggestion Dropdown', async ({ page }) => {
//   await page.goto('https://www.amazon.in/');

//   await page.locator("input[name='field-keywords']").fill('smart'); // Search Text
//   await page.waitForTimeout(3000);

//   // Get all the suggested options ==> Ctrl+Shift+P on DOM ==> emulate focused page
//   const options: Locator = page.locator('.left-pane-results-container>div');
//   const count: number = await options.count();
//   console.log('Number of suggested options: ', count);

//   // Printing all the suggested options in the console
//   //   console.log('5th option: ', await options.nth(5).innerText());

//   console.log('Printing all the nth auto suggestions...');
//   for (let i = 0; i < count; i++) {
//     // console.log(await options.nth(i).innerText());
//     console.log(await options.nth(i).textContent());
//   }

//   for (let i = 0; i < count; i++) {
//     const text = await options.nth(i).innerText();
//     if (text === 'smartwatch for man') {
//       options.nth(i).click();
//       break;
//     }
//   }
//   await page.waitForTimeout(5000);
// });

// test.only('Bootstrap hidden dropdown', async ({ page }) => {
//   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

//   // Login Page
//   await page.locator("input[name='username']").fill('Admin');
//   await page.locator("input[name='password']").fill('admin123');
//   await page.locator("button[type='Submit']").click();

//   // Click on the PIM
//   await page.getByText('PIM').click();

//   // Click on Job Title Dropdown
//   await page.locator('form i').nth(2).click();
//   await page.waitForTimeout(2000);

//   // Capture all the options from dropdown and count.
//   const options: Locator = page.locator("div[role='listbox'] span");
//   const count: number = await options.count();
//   // console.log('The Number of options in a dropdown: ', count);

//   //   // Print all the options
//   //   console.log('All the text contents: ', await options.allTextContents());

//   // Print all the options from the dropdown.
//   //   for (let i = 0; i < count; i++) {
//   //     console.log(await options.nth(i).textContent());
//   //   }

//   // // Select/Click on option
//   // for (let i = 0; i < count; i++) {
//   //   const text = await options.nth(i).innerText();
//   //   if (text === 'Network Administrator') {
//   //     await options.nth(i).click();
//   //     console.log('Selected Option: ', text);
//   //     break;
//   //   }
//   // }
//   // //   await page.waitForTimeout(50000);
// });
