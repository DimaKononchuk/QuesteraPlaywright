// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');
test('user login platform', async ({ page }) => {
  await page.goto('https://dev.questera.games/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).click();
  await page.getByRole('textbox', { name: 'Enter email' }).fill('questeratest1747839922@questera.test');
  await page.getByRole('textbox', { name: 'Enter password' }).click();
  await page.getByRole('textbox', { name: 'Enter password' }).fill('!Qazxsw2');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(3000);
  await page.waitForURL("https://dev.questera.games/home");
  await expect(page).toHaveURL("https://dev.questera.games/home");
  await page.context().storageState({ path: authFile });
});

