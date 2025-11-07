import test, { page,expect } from "@playwright/test";



test.describe("login test",()=>{

    test("discord login", async({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.getByRole('button', { name: 'Discord' }).click();
        await page.waitForURL(/.*discord\.com\/oauth2\/authorize.*/)
        await expect(page.locator('//h1[@data-text-variant="heading-xl/semibold" and text()="Discord App Launched"]')).toBeVisible();
        
    })

    test("twitch login", async({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.getByRole('button', { name: 'Twitch' }).click();
        await page.waitForURL(/.*twitch\.tv\/login.*/)
        await expect(page.getByText('Log in to Twitch')).toBeVisible();
        
    })

    test("Google login", async({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        await page.getByRole('button', { name: 'Google' }).click();
        await page.waitForURL(/.*accounts\.google\.com\/v3\/signin.*/)
        await expect(page.getByText('Sign in', { exact: true })).toBeVisible();
        
    })

    test("login email", async ({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('button', { name: 'Email' }).click();

        await expect(page.getByText('Log in with email')).toBeVisible();

        await page.locator('input[formcontrolname="email"]').fill("questeratest1758891485@questera.test");
        await page.locator('input[formcontrolname="password"]').fill("!Qazxsw2");
        
        await page.locator('button[type="submit"]').click();

        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
    })

    test("login invalid email", async ({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('button', { name: 'Email' }).click();

        await expect(page.getByText('Log in with email')).toBeVisible();

        await page.locator('input[formcontrolname="email"]').fill("questeratest1758891485965@questera.test");
        await page.locator('input[formcontrolname="password"]').fill("!Qazxsw2");
        
        await page.locator('button[type="submit"]').click();

        await expect(page.getByText('Invalid credentials')).toBeVisible();
    })
    
    test("login invalid password", async ({page})=>{
        await page.goto("https://dev.questera.games/");
        await page.getByRole('button', { name: 'Log in' }).click();
        
        await page.getByRole('button', { name: 'Email' }).click();

        await expect(page.getByText('Log in with email')).toBeVisible();

        await page.locator('input[formcontrolname="email"]').fill("questeratest1758891485@questera.test");
        await page.locator('input[formcontrolname="password"]').fill("!Qazxsw22");
        
        await page.locator('button[type="submit"]').click();

        await expect(page.getByText('Invalid credentials')).toBeVisible();
    })
    
})