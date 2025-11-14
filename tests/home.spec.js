import test, { page,expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { Sidebar } from '../pages/Components/Sidebar';
import { Header } from "../pages/Components/Header";
import { WalletPage } from "../pages/WalletPage";
import { SettingsPage } from "../pages/SettingsPage";
import { OverlayPage } from "../pages/OverlayPage";
import { PortalMenu } from "../pages/Components/PortalMenu";

const ENVIRONMENT=process.env.TEST_ENVIRONMENT;

const profileMenu=[
    {name:'Settings', regexUrl:/\/profile\/settings$/,title:'Settings'},
    {name:'Wallet', regexUrl:/\/profile\/wallet$/,title:'Wallet'},
    {name:'Subscription', regexUrl:/\/profile\/subscription$/,title:'Subscription'},
    {name:'Bonuses', regexUrl:/\/profile\/rewards$/,title:'Bonuses'},
    {name:'Referral system', regexUrl:/\/profile\/referral$/,title:'Referral system'}

]


test.describe('(Home Page) testing redirect',()=>{

    
    let sidebar;

    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page, ENVIRONMENT);
        sidebar = new Sidebar(page, ENVIRONMENT);
        await home.openPage();
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
    });

    test('click Challenges', async ({ page }) => {
        await sidebar.challengeClick();
        await expect(page).toHaveURL(/\/Dota2\/challenges\/AllPickRanked$/);
    });

    test('click Calibration', async ({ page }) => {
        await sidebar.calibrationClick();
        await expect(page).toHaveURL(/\/Dota2\/calibration\/AllPickRanked$/);
    });

    test('click Lucky Box', async ({ page }) => {
        await sidebar.luckyBoxClick();
        await expect(page).toHaveURL(/\/Dota2\/lucky-box$/);
    });

    


})


test.describe("Header testing", ()=>{

    let header;
    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page, ENVIRONMENT);
        header = new Header(page);
        await home.openPage();
        await expect(header.getBuyEnergyBtn()).toBeVisible();
    });

    test('click "Buy Energy" button', async({page})=>{
        await expect(header.getBuyEnergyBtn()).toBeVisible();
        await header.getBuyEnergyBtn().click();
        await page.waitForURL(/\/profile\/wallet\/top-up$/);
        const walletPage=new WalletPage(page,ENVIRONMENT);
        await expect(walletPage.getProfileTitle()).toBeVisible();
        await expect(walletPage.getProfileTitle()).toHaveText('Deposit balance');
    })
    test('click Avatar icon', async({page})=>{
        await expect(header.getBuyEnergyBtn()).toBeVisible();
        await header.getAvatarIcon().click();
        const settingsPage=new SettingsPage(page,ENVIRONMENT);
        await page.waitForURL(/\/profile\/settings$/);
        await expect(settingsPage.getProfileTitle()).toBeVisible();
        await expect(settingsPage.getProfileTitle()).toHaveText('Personal info');
    })
    
    test('click dropdown toogle', async({page})=>{
        await expect(header.getBuyEnergyBtn()).toBeVisible();
        await expect(header.getBurgerMenu()).toBeHidden();
        await header.getDropDownToogle().click();
        await expect(header.getBurgerMenu()).toBeVisible();
        await expect(header.getBurgerMenuItem('Settings')).toBeVisible();
        await header.getDropDownToogle().click();
        await expect(header.getBurgerMenu()).toBeHidden();
    })

    test('click notification menu', async({page})=>{
        await expect(header.getNotificationsMenu()).toBeVisible();
        await expect(header.getNotificationsMenuList()).toBeHidden();
        await header.getNotificationsMenu().click();
        await expect(header.getNotificationsMenuList()).toBeVisible();
        await header.getNotificationsMenu().click();
        await expect(header.getNotificationsMenuList()).toBeHidden();
    })

    test("click overlay button", async({page})=>{
        await expect(header.getOverlayButton()).toBeVisible();
        await header.getOverlayButton().click();
        await page.waitForURL(/\/overlay\/?$/);
        const overlayPage=new OverlayPage(page);
        await expect(overlayPage.getTitle()).toHaveText('Track your challenge while you play');
        await expect(header.getOverlayButton()).toBeHidden();
        await header.getLogo().click();
        await expect(header.getOverlayButton()).toBeVisible();


    })

    for(const item of profileMenu){
        test(`Profile Menu. click "${item.name}"`, async({page})=>{
            const portalMenu=new PortalMenu(page);
            await expect(header.getBuyEnergyBtn()).toBeVisible();
            await expect(header.getBurgerMenu()).toBeHidden();
            await header.getDropDownToogle().click();
            await expect(header.getBurgerMenu()).toBeVisible();
            await header.getBurgerMenuItem(item.name).hover();
            await expect(header.getBurgerMenuItem(item.name)).toHaveCSS('color', 'rgb(255, 255, 255)');
            await header.getBurgerMenuItem(item.name).click();            
            await page.waitForURL(item.regexUrl);
            await expect(header.getBurgerMenu()).toBeHidden();
            await expect(portalMenu.getPortalMenuItem(item.title)).toBeVisible();
            await expect(portalMenu.getPortalMenuItem(item.title)).toHaveClass(/game-button_active/);
            await expect(portalMenu.getPortalMenuItem(item.title)).toHaveCSS('color', 'rgb(187, 160, 114)');
            await header.getDropDownToogle().click();
            await expect(header.getBurgerMenu()).toBeVisible();
            await expect(header.getBurgerMenuItem(item.title)).toHaveClass(/game-button_active/);
            await expect(header.getBurgerMenuItem(item.title)).toHaveCSS('color', 'rgb(187, 160, 114)');
        })
    }
    test.afterEach(async ({ page }) => {
        page.close();        
    });
})