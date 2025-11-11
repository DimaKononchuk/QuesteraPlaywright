import test, { page,expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';


const ENVIRONMENT=process.env.TEST_ENVIRONMENT;
const EMAIL=process.env.TEST_EMAIL;
const BANNEDEMAIL=process.env.TEST_BANNED_EMAIL;
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
            const title=await loginPage.getTitle('Log in to platform');
            await expect(title).toBeVisible({timeout:60000});
            await loginPage.loginWithProvider(provider.name)
            await page.waitForURL(provider.urlRegex);
            await expect(page.getByText(provider.checkText)).toBeVisible({timeout:60000});

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
        await expect(page.getByText('Invalid credentials')).toBeVisible({timeout:60000});
            
    })
    test('mail login invalid password', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);
        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail(EMAIL,"PASSWORD122");
        await expect(page.getByText('Invalid credentials')).toBeVisible({timeout:60000});
            
    })

    test('mail login baned user', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);
        await loginPage.openPage();
        await loginPage.clickLogin();
        await loginPage.loginWithEmail(BANNEDEMAIL,PASSWORD);
        await expect(page.getByText('Your account has been banned')).toBeVisible();
    })
})


test.describe("register", ()=>{

    for(const provider of providers){
        test(`register with ${provider.name} external provider`, async({page})=>{
            const loginPage=new LoginPage(page,ENVIRONMENT);            
            await loginPage.openPage();
            await loginPage.clickRegister();
            const title=await loginPage.getTitle('Create account');
            await expect(title).toBeVisible({timeout:60000});
            await loginPage.loginWithProvider(provider.name)
            await page.waitForURL(provider.urlRegex);
            await expect(page.getByText(provider.checkText)).toBeVisible({timeout:60000});

        })
    }

    test('mail register valid credentials (fingerprint)', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);
        await loginPage.openPage();
        await loginPage.clickRegister();
        await loginPage.clickNeedMoreOptions();
        await loginPage.clickEmail();
        const fingerParams= await page.evaluate(()=>{
            return sessionStorage.getItem('@fpjs@client@__null__null__false');
        })
        await loginPage.registerWithEmail(generateRandomEmail());
        await expect(page.getByText('Valid email format')).toBeVisible();
        await loginPage.clickNextBtn();
        if(fingerParams){
            await expect(page.locator('.identity-error__title', { hasText: 'Unable to create an account' })).toBeVisible();
        }else{
            loginPage.registerWithPassword(PASSWORD);
        await expect(page.locator('.register-success-section__title', { hasText: 'Confirmation' })).toBeVisible();
        }
        
    })



    function generateRandomEmail() {
        const randomNumber = Math.floor(Math.random() * 10000); // 0–9999
        return `questeratest${randomNumber}@questera.test`;
    }

    test('register used mail', async({page})=>{
        const loginPage= new LoginPage(page,ENVIRONMENT);
        await loginPage.openPage();
        await loginPage.clickRegister();
        await loginPage.clickNeedMoreOptions();
        await loginPage.clickEmail();
        await loginPage.registerWithEmail(EMAIL);
        const title=await loginPage.getTitle('Email is already exist');
        await expect(title).toBeVisible();
        
    })

    



})