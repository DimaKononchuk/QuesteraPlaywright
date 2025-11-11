import test, { page,expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from '../pages/LoginPage';
const ENVIRONMENT=process.env.TEST_ENVIRONMENT;


test.describe("Landing page testing", async()=>{

    test('click "Try First Challenge" button', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        const loginPage=new LoginPage(page,ENVIRONMENT);
        await landingPage.openPage();
        await landingPage.clickTryFirstChallengeBtn();
        await page.waitForURL(/identity\.dev\.questera\.games/)
        const title=loginPage.getTitle('Create account');
        await expect(title).toBeVisible();
    })
})