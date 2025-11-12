import test, { page,expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from '../pages/LoginPage';
import { CookieBanner } from "../pages/CookieBanner";
const ENVIRONMENT=process.env.TEST_ENVIRONMENT;

const icon=[
        { name: 'Discord', urlRegex: /discord\.com\/invite/, checkText: 'Questera' },
        { name: 'Youtube', urlRegex: /youtube\.com/, checkText: 'Questera'},
        { name: 'Instagram',urlRegex: /instagram\.com\/questera_games/, checkText:'questera_games'},
        { name: 'Tiktok', urlRegex: /tiktok\.com\/@questera\.games/, checkText:'questera.games'}
    ]
test.describe("Landing page testing", async()=>{

    test.beforeEach(async ({ page }) => {
        const landingPage = new LandingPage(page, ENVIRONMENT);
        await landingPage.openPage();
        const cookieBanner=new CookieBanner(page);

        if(await cookieBanner.isVisible()){
            await cookieBanner.clickClose();
        }

      });

    for(const provider of icon){
            test(`Click ${provider.name} icon`, async ({page,context})=>{
                const landingPage=new LandingPage(page,ENVIRONMENT);            
                const pagePromise = context.waitForEvent('page');            
                await landingPage.clickHeaderIcon(provider.name);
                const newPage = await pagePromise;
                await newPage.waitForURL(provider.urlRegex);
                await expect(newPage.getByText(provider.checkText).nth(0)).toBeVisible({timeout:60000});
    
            })
        }  
        
    test('click "Try First Challenge" button', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        const loginPage=new LoginPage(page,ENVIRONMENT);
        await landingPage.clickTryFirstChallengeBtn();
        await page.waitForURL(/identity\.dev\.questera\.games/)
        const title=loginPage.getTitle('Create account');
        await expect(title).toBeVisible();
    })

    test('click "Challenge" button', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        await page.waitForTimeout(2000);
        await landingPage.clickChallengeNavigation();
        await page.waitForTimeout(3000);
        const slide = page.locator('.swiper-slide-active img');
        await expect(slide).toHaveScreenshot('../img/challengeNavigationImg.png')
    })

    test('click "Lucky Box" button', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        await page.waitForTimeout(2000);
        await landingPage.clickLuckyBoxNavigation();
        await page.waitForTimeout(3000);
        const slide =await page.locator('.swiper-slide-active img');
        await expect(slide).toHaveScreenshot('../img/luckyBoxNavigationImg.png')
    })

    test('click "Play Challenge" button', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        const loginPage=new LoginPage(page,ENVIRONMENT);
        await landingPage.clickPlayChallenges();
        await page.waitForURL(/identity\.dev\.questera\.games/)
        const title=loginPage.getTitle('Create account');
        await expect(title).toBeVisible();
    })

    test('check "FAQ" accordion', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        await expect(landingPage.getAnswerBlock()).toBeHidden();
        await landingPage.clickQuestionBlock();
        await expect(landingPage.getQuestionBlock()).toHaveClass(/active/);
        await expect(landingPage.getAnswerBlock()).toHaveClass(/show-faq-answer/);
        await expect(landingPage.getAnswerBlock()).toBeVisible();
        await landingPage.clickQuestionBlock();
        await expect(landingPage.getQuestionBlock()).not.toHaveClass(/active/);
        await expect(landingPage.getAnswerBlock()).not.toHaveClass(/show-faq-answer/);
        await expect(landingPage.getAnswerBlock()).toBeHidden();
    })
    test.afterEach(async ({ page }) => {
        page.close();        
    });

    
})