// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

const ENVIRONMENT=process.env.TEST_ENVIRONMENT;
const EMAIL=process.env.TEST_EMAIL;
const PASSWORD=process.env.TEST_PASSWORD;

test('get user token', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);
        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail(EMAIL,PASSWORD);
        await page.waitForURL(/questera\.games\/home/);
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
        await page.context().storageState({ path: authFile });    

})