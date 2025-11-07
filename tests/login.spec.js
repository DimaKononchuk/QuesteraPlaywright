import test, { page,expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';


const ENVIRONMENT=process.env.TEST_ENVIRONMENT;
const EMAIL=process.env.TEST_EMAIL;
const PASSWORD=process.env.TEST_PASSWORD;


const providers = [
    { name: 'Discord', urlRegex: /discord\.com\/oauth2\/authorize/, checkText: 'Discord App Launched' },
    { name: 'Twitch', urlRegex: /twitch\.tv\/login/, checkText: 'Log in to Twitch' },
    { name: 'Google', urlRegex: /accounts\.google\.com\/v3\/signin/, checkText: 'Sign in with Google' }
]
test.describe("login v1.1", ()=>{
    
    for(const provider of providers){
        test(`login with ${provider.name} external provider`, async({page})=>{
            const loginPage=new LoginPage(page,ENVIRONMENT);
            
            await loginPage.openPage();
            await loginPage.clickLogin();
            await loginPage.loginWithProvider(provider.name)
            await page.waitForURL(provider.urlRegex);
            await expect(page.getByText(provider.checkText)).toBeVisible();

        })
    }

    test('mail login valid credentials', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);

        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail(EMAIL,PASSWORD);
        await page.waitForURL(/questera\.games\/home/);
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
            
    })

    test('mail login invalid email', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);

        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail('EMAIL@gmail.com',PASSWORD);
        await expect(page.getByText('Invalid credentials')).toBeVisible();
            
    })
    test('mail login invalid password', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);

        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail(EMAIL,"PASSWORD122");
        await expect(page.getByText('Invalid credentials')).toBeVisible();
            
    })
})