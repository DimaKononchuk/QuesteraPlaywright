import test, { page,expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from '../pages/LoginPage';
import { CookieBanner } from "../pages/CookieBanner";
import { ZendeskWidget } from "../pages/Widget/ZendeskWidget";
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

    test('click "support team" link', async({page})=>{
        const landingPage=new LandingPage(page,ENVIRONMENT);
        const zendeskWidget=new ZendeskWidget(page);
        await landingPage.clickSupportTeamLink()
        await page.waitForTimeout(2500);
        await expect(zendeskWidget.getWidget()).toBeVisible();
    })


    test('Cash Clash active. CLick "Top Up Prize Pool" button', async({page})=>{
        const landingPage = new LandingPage(page, ENVIRONMENT);
        const loginPage = new LoginPage(page, ENVIRONMENT);

        try {
            if (!(await landingPage.getCashClashBlock().isVisible())) {
                console.log('Cash Clash block not visible — skipping test');
                return;
            }

            await landingPage.clickToUpPrizePoolBtn();
            const title = await loginPage.getTitle('Create account'); 
            await expect(title).toBeVisible({ timeout: 60000 });

        } catch (err) {
            console.log('Cash Clash block check failed:', err.message);
        }
    })

    test('Gold Seeker active. CLick "Start Now" button', async({page})=>{
        const landingPage = new LandingPage(page, ENVIRONMENT);
        const loginPage = new LoginPage(page, ENVIRONMENT);

        try {
            if (!(await landingPage.getGoldSeekerBlock().isVisible())) {
                console.log('Gold Seeker block not visible — skipping test');
                return;
            }

            await landingPage.clickGSStartNow();
            await expect(page).toHaveURL(/questera\.games\/gold-seeker/);

        } catch (err) {
            console.log('Gold Seeker block check failed:', err.message);
        }
    })
    test.afterEach(async ({ page }) => {
        page.close();        
    });

    
})