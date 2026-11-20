// Flaky Test: Sometimes passes sometimes fails. (No Consistency)
import { test, expect } from '@playwright/test';

test.only('Flaky Test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(10000);
  await expect(page.getByRole('link', { name: 'Log in' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});
