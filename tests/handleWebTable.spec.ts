import { test, expect, Locator } from '@playwright/test';

// test.only('Comparing Methods', async ({ page }) => {
//   await page.goto('https://demowebshop.tricentis.com/');

//   const products: Locator = page.locator('.product-title');

//   // 1. InnerText() VS TextContent()

//   //   console.log(await products.nth(1).innerText());
//   //   console.log(await products.nth(1).textContent());

//   //   const count: number = await products.count();

//   //   for (let i = 0; i < count; i++) {
//   //     const productName = await products.nth(i).innerText();
//   //     console.log(productName);
//   //     // const productName = await products.nth(i).textContent();
//   //     // console.log(productName?.trim());
//   //   }

//   //   // 2. AllInnerText() VS AllTextContents()

//   //   console.log('******** Comparing allInnerTexts() VS allTextContents() **********');

//   //   //   const productNames: string[] = await products.allInnerTexts();
//   //   //   console.log('Product Names captured by allInnerText(): ', productNames);

//   //   //   const productNames: string[] = (await products.allTextContents()).map((name) => name.trim());
//   //   //   console.log('Product Names captured by allTextContents(): ', productNames);

//   // 3. all() - Converts Locator ---> Locator[]
//   const productLocators: Locator[] = await products.all();
//   //   console.log(await productLocators[1].innerText());
//   for (let productLoc of productLocators) {
//     console.log(await productLoc.innerText());
//   }
// });

test.only('Static Web Table', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const table: Locator = page.locator("table[name='BookTable'] tbody");
  await expect(table).toBeVisible();

  // 1. Count number of rows in a table
  const rows: Locator = page.locator("table[name='BookTable'] tbody tr"); // return all the rows including header
  //   await expect(rows).toHaveCount(7); // Approach 1

  //   const rowCount: number = await rows.count();
  //   console.log('Number of rows in a table: ', rowCount);
  //   expect(rowCount).toBe(7); // Approach 2

  //   // 2. Count number of headers/columns

  //   // const columns:Locator = page.locator("table[name='BookTable'] tbody tr th");

  //   const columns: Locator = rows.locator('th');
  //   await expect(columns).toHaveCount(4); // Approach 1

  //   const columnCount: number = await columns.count();
  //   console.log('Number of columns/headers: ', columnCount);
  //   expect(columnCount).toBe(4); // Approach 2

  //   // 3. Read all the data from 2nd row (index 2 means 3rd row including header)
  //   const secondRowCells: Locator = rows.nth(2).locator('td');
  //   const secondRowTexts: string[] = await secondRowCells.allInnerTexts();

  //   console.log('2nd Row Data: ', secondRowTexts);

  //   await expect(secondRowCells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']); // Assertion

  //   console.log('Printing 2nd row data...');
  //   for (let text of secondRowTexts) {
  //     console.log(text);
  //   }

  //   // 4. Read all data from the table (excluding header)
  //   console.log('Printing all table data...');
  //   const allRowData = await rows.all(); // get all row locators // all() returns array of locators

  //   console.log('BookName | Author | Subject | Price');
  //   for (let row of allRowData.slice(1)) {
  //     const cols = await row.locator('td').allInnerTexts();
  //     console.log(cols);
  //   }

  //   // 5. Print Book names where author is Mukesh
  //   console.log('Books written by Mukesh .......');

  //   const mukeshBooks: string[] = [];
  //   for (let row of allRowData.slice(1)) {
  //     const cells = await row.locator('td').allInnerTexts();
  //     const author = cells[1];
  //     const book = cells[0];

  //     if (author === 'Mukesh') {
  //       console.log(`${author} /t ${book}`);
  //       mukeshBooks.push(book);
  //     }
  //   }

  // //   expect(mukeshBooks).toHaveLength(2); // Assertion

  // // 6. Calculate total price of all books
  // const allRowData = await rows.all();

  // let totalPrice = 0;
  // for (let row of allRowData.slice(1)) {
  //   const cells = await row.locator('td').allInnerTexts();
  //   const price = cells[3];

  //   totalPrice += parseInt(price);
  // }
  // console.log('Total Price: ', totalPrice);
  // expect(totalPrice).toBe(7100); // Assertion
});
