import { test, expect, Locator } from '@playwright/test';

// ****************** Input Element Actions *************************
/*
test('Verify the input element', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const textbox: Locator = page.locator('#name');
  const textbox2: Locator = page.locator('#email');
  await expect(textbox).toBeVisible();
  await expect(textbox).toBeEnabled();
  await expect(textbox2).toBeVisible();
  await expect(textbox2).toBeEnabled();

  const maxlength: string | null = await textbox.getAttribute('maxlength');
  expect(maxlength).toBe('15');
  const maxlength2: string | null = await textbox2.getAttribute('maxlength');
  expect(maxlength2).toBe('25');

  await textbox.fill('John Canedy');
  await textbox2.fill('johncanedy@gmail.com');

  const enteredValue: string = await textbox.inputValue();
  console.log('input value of the FirstName: ', enteredValue);
  expect(enteredValue).toBe('John Canedy');

  const enteredValue2: string = await textbox2.inputValue();
  console.log('input value of the email: ', enteredValue2);
  expect(enteredValue2).toBe('johncanedy@gmail.com');

  await page.waitForTimeout(10000);
});
*/

// *************** Radio Button Actions **************************
/*test.only('Verify the radio button action', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const maleRadioButton: Locator = page.locator('#male');

  await expect(maleRadioButton).toBeVisible();
  await expect(maleRadioButton).toBeEnabled();

  expect(await maleRadioButton.isChecked()).toBe(false);

  await maleRadioButton.check();
  await expect(maleRadioButton).toBeChecked(); // preferred one
  await page.waitForTimeout(5000);
});
*/

// ************************ Check Box Actions ****************************************

test('Verify the Check box action', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // 1. Select specific checkbox (Sunday) using getByLabel and assert.
  /*
  const sundayCheckbox: Locator = page.getByLabel('Sunday');
  await sundayCheckbox.check();
  await expect(sundayCheckbox).toBeChecked(); // preferred one
  */

  // 2. Select all checkboxes and assert each is checked
  /*
  const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const checkboxes: Locator[] = days.map((item) => page.getByLabel(item));
  expect(checkboxes.length).toBe(7);
  */

  // 3. Select all checkboxes using iteration and assert each is checked
  /*
  const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (const day of days) {
    const checkbox: Locator = page.getByLabel(day);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  await page.waitForTimeout(3000);
  // 4. Uncheck last 3 checkboxes and assert

  const checkboxes: Locator[] = days.map((item) => page.getByLabel(item));
  for (const checkbox of checkboxes.slice(-3)) {
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  }

  await page.waitForTimeout(3000);
  */

  // 5. Toggle Checkboxes: If checked,uncheck; if unchecked,check. Assert state flipped.
  /*
  const days2: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const checkboxes2: Locator[] = days2.map((item) => page.getByLabel(item));
  for (const checkbox of checkboxes2) {
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    } else {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
    }
  }
  */

  // 6. Randomly select checkboxes - select checkboxes by index (1,3,6) and assert
  /*
  const randomCheckboxes: number[] = [1, 3, 6];
  const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  for (const i of randomCheckboxes) {
    const checkbox: Locator = page.getByLabel(days[i]);
    await checkbox.check();
    await expect(checkbox).toBeChecked();
  }

  */

  // // 7. Select the checkbox based on the label.
  // const weekName: string = 'FriDay';
  // const days: string[] = [
  //   'Sunday',
  //   'Monday',
  //   'Tuesday',
  //   'Wednesday',
  //   'Thursday',
  //   'Friday',
  //   'Saturday',
  // ];
  // for (const label of days) {
  //   if (label.toLowerCase() === weekName.toLowerCase()) {
  //     const checkbox: Locator = page.getByLabel(label);
  //     await checkbox.check();
  //     await expect(checkbox).toBeChecked();
  //   }
  // }
  // await page.waitForTimeout(3000);
});
