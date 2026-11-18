import { test, expect, Locator } from '@playwright/test';

// test.only('Simple Dialog', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

//   // Register a dialog handler : (This should be register before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.)
//   page.on('dialog', (dialog) => {
//     console.log('Dialog Type is: ', dialog.type());
//     expect(dialog.type()).toContain('confirm');
//     console.log('Dialog Text: ', dialog.message());
//     expect(dialog.message()).toContain('Press a button!');
//     // dialog.accept(); // close dialog by accepting
//     dialog.dismiss(); // close dialog by dismissing
//   });
//   await page.locator('#confirmBtn').click();

//   const text: string = await page.locator('#demo').innerText();
//   console.log('Output text: ', text);
//   await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
//   await page.waitForTimeout(5000);
// });

// test.only('Prompt Dialog', async ({ page }) => {
//   await page.goto('https://testautomationpractice.blogspot.com/');

//   // Register a dialog handler : (This should be register before the action that triggers the dialog to either dialog.accept() or dialog.dismiss() it.)
//   page.on('dialog', (dialog) => {
//     console.log('Dialog Type is: ', dialog.type());
//     expect(dialog.type()).toContain('prompt');
//     console.log('Dialog Text: ', dialog.message());
//     expect(dialog.message()).toContain('Please enter your name:');
//     expect(dialog.defaultValue()).toContain('Harry Potter'); // checks default value of the dialog
//     dialog.accept('John'); // close dialog by accepting
//     // dialog.dismiss(); // close dialog by dismissing
//   });
//   await page.locator('#promptBtn').click(); // Opens prompt dialog

//   const text: string = await page.locator('#demo').innerText();
//   console.log('Output text: ', text);
//   await expect(page.locator('#demo')).toHaveText('Hello John! How are you today?');
//   await page.waitForTimeout(5000);
// });
