import test, { page,expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { Sidebar } from '../pages/Components/Sidebar';
import { Header } from "../pages/Components/Header";
import { WalletPage } from "../pages/WalletPage";
import { SettingsPage } from "../pages/SettingsPage";
import { OverlayPage } from "../pages/OverlayPage";
import { PortalMenu } from "../pages/Components/PortalMenu";
import { ZendeskWidget } from "../pages/Widget/ZendeskWidget";
import { SteamAcountPopup } from "../pages/Popup/SteamAccountPopup";
import { DepositPage } from "../pages/DepositPage";
import { BountyServiceAPI } from "../helpers/BountyServiceAPI";

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
        const walletTitle=walletPage.getProfileTitle()
        await expect(walletTitle).toBeVisible();
        await expect(walletTitle).toHaveText('Deposit balance');
    })
    test('click Avatar icon', async({page})=>{
        await expect(header.getBuyEnergyBtn()).toBeVisible();
        await header.getAvatarIcon().click();
        const settingsPage=new SettingsPage(page,ENVIRONMENT);
        await page.waitForURL(/\/profile\/settings$/);
        const settingsTitle=settingsPage.getProfileTitle();
        await expect(settingsTitle).toBeVisible();
        await expect(settingsTitle).toHaveText('Personal info');
    })
    
    test('click dropdown toogle', async({page})=>{
        await expect(header.getBuyEnergyBtn()).toBeVisible();
        const burgerMenu=header.getBurgerMenu();
        await expect(burgerMenu).toBeHidden();
        await header.getDropDownToogle().click();
        await expect(burgerMenu).toBeVisible();
        await expect(header.getBurgerMenuItem('Settings')).toBeVisible();
        await header.getDropDownToogle().click();
        await expect(burgerMenu).toBeHidden();
    })

    test('click notification menu', async({page})=>{
        await expect(header.getNotificationsMenu()).toBeVisible();
        const notificationsMenuList=header.getNotificationsMenuList()
        await expect(notificationsMenuList).toBeHidden();
        await header.getNotificationsMenu().click();
        await expect(notificationsMenuList).toBeVisible();
        await header.getNotificationsMenu().click();
        await expect(notificationsMenuList).toBeHidden();
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
            const portalMenu = new PortalMenu(page);
            const dropdownToggle = header.getDropDownToogle();
            const burgerMenu = header.getBurgerMenu();
            const menuItem = header.getBurgerMenuItem(item.name);
            const portalMenuItem = portalMenu.getPortalMenuItem(item.title);
            await expect(header.getBuyEnergyBtn()).toBeVisible();
            await expect(burgerMenu).toBeHidden();
            await dropdownToggle.click();
            await expect(burgerMenu).toBeVisible();
            await menuItem.hover();
            await expect(menuItem).toHaveCSS('color', 'rgb(255, 255, 255)');
            await menuItem.click();
            await page.waitForURL(item.regexUrl);
            await expect(burgerMenu).toBeHidden();
            await expect(portalMenuItem).toBeVisible();
            await expect(portalMenuItem).toHaveClass(/game-button_active/);
            await expect(portalMenuItem).toHaveCSS('color', 'rgb(187, 160, 114)');
            await dropdownToggle.click();
            await expect(burgerMenu).toBeVisible();
            const activeBurgerItem = header.getBurgerMenuItem(item.title);
            await expect(activeBurgerItem).toHaveClass(/game-button_active/);
            await expect(activeBurgerItem).toHaveCSS('color', 'rgb(187, 160, 114)');
        })
    }

    test('Profile Menu. Click "How It Works" item', async({page,context})=>{
            const pagePromise = context.waitForEvent('page');
            const dropdownToggle = header.getDropDownToogle();
            const burgerMenu = header.getBurgerMenu();
            const howItWorksItem = header.getBurgerMenuHowItWorksItem();
           
            await expect(header.getBuyEnergyBtn()).toBeVisible();
            await expect(burgerMenu).toBeHidden();
            
            await dropdownToggle.click();
            await expect(burgerMenu).toBeVisible();
            
            await howItWorksItem.hover();
            await expect(howItWorksItem).toHaveCSS('color', 'rgb(255, 255, 255)');
            
            await howItWorksItem.click();
            const newPage = await pagePromise;
            
            await newPage.waitForURL(/questera\.zendesk\.com/);
            
            await expect(newPage.getByRole('heading', { name: 'How it works' })).toBeVisible();
            
    })

    test('Profile Menu. Click "Platform support" item', async({page,context})=>{
            const zendeskWidget = new ZendeskWidget(page);

            await expect(header.getBuyEnergyBtn()).toBeVisible();
            await expect(header.getBurgerMenu()).toBeHidden();

            await header.getDropDownToogle().click();
            await expect(header.getBurgerMenu()).toBeVisible();

            await header.getBurgerMenuSupportItem().hover();
            await expect(header.getBurgerMenuSupportItem()).toHaveCSS('color', 'rgb(255, 255, 255)');

            await header.getBurgerMenuSupportItem().click();
            
            await expect(zendeskWidget.getWidget()).toBeVisible({ timeout: 10000 });
    })
    test.afterEach(async ({ page }) => {
        page.close();        
    });
})

test.describe("Started block", ()=>{

    let home;
    test.beforeEach(async ({ page }) => {
        home = new HomePage(page, ENVIRONMENT);        
        await home.openPage();
        await expect(home.getStartedBlock()).toBeVisible();
    });

    test('click "Connect Steam Account" block',async({page})=>{
        const steamAccountPopup=new SteamAcountPopup(page);
        let steamBlock=home.getStartedItem('1. Connect Steam account');
        const popup=steamAccountPopup.getPopup();
        await expect(steamBlock).toBeVisible();
        await expect(popup).toBeHidden();
        await steamBlock.click();
        await page.waitForURL(/games\/home.*[?&]onboarding(?:=|&|$)/);
        await expect(popup).toBeVisible();
    })

    test('click "Complete Calibration" block',async({page})=>{
        const sidebar=new Sidebar(page);
        let calibrationBlock=home.getStartedItem('2. Complete Calibration');
        await expect(calibrationBlock).toBeVisible();
        await calibrationBlock.click();
        await page.waitForURL(/Dota2\/calibration\/[A-Za-z]+/);
        const calibrationNav = sidebar.getNavigationItem('Calibration');
        await expect(calibrationNav).toHaveClass(/navigation__activities__item_active/);
        await expect(calibrationNav).toHaveCSS('background','rgba(0, 0, 0, 0) linear-gradient(90deg, rgba(255, 117, 1, 0.12), rgba(255, 117, 1, 0)) repeat scroll 0% 0% / auto padding-box border-box');
    })
    
    test('click "Buy Energy" block', async({page})=>{
        let buyEnergyBlock=home.getStartedItem('3. Buy energy');
        const depositPage=new DepositPage(page,ENVIRONMENT);
        const portalMenu=new PortalMenu(page);
        await expect(buyEnergyBlock).toBeVisible();
        await buyEnergyBlock.click();
        await page.waitForURL(/\/profile\/wallet\/top-up$/);
        await expect(depositPage.getProfileTitle()).toHaveText('Deposit balance');
        const portalMenuWalletItem=portalMenu.getPortalMenuItem('Wallet');
        await expect(portalMenuWalletItem).toHaveClass(/game-button_active/);
        await expect(portalMenuWalletItem).toHaveCSS('color', 'rgb(187, 160, 114)');
    })

    test.afterEach(async ({ page }) => {
        page.close();        
    });
})

test.describe('Daily box', ()=>{

    test('Daily item state "Active"', async({page})=>{
        const bountyService= new BountyServiceAPI(page);
        await bountyService.mockDailyEnergyBoxState('Active');
        const home = new HomePage(page, ENVIRONMENT);        
        await home.openPage();
        await expect(home.getDailyBox()).toBeVisible();
        const dailyItem=home.getDailyItem();
        await expect(dailyItem).toHaveClass(/daily__item-active/);
        await expect(dailyItem).toHaveCSS('background', /url\(".*\/img\/daily-box\/star\.svg"\) no-repeat .* linear-gradient\(137deg, rgb\(255, 61, 0\) 1\.23%, rgb\(255, 122, 0\) 86\.63%\)/);
        await expect(dailyItem).toHaveText(/Claim/);
        await dailyItem.hover();
        await expect(page.locator('div.daily__item-active')).toHaveCSS('transform','matrix(1.25, 0, 0, 1.25, 0, 0)');
    })

    test('Daily item state "Blocked"', async({page})=>{
        const bountyService= new BountyServiceAPI(page);
        await bountyService.mockDailyEnergyBoxState('Blocked');
        const home = new HomePage(page, ENVIRONMENT);        
        await home.openPage();
        await expect(home.getDailyBox()).toBeVisible();
        const dailyItem=home.getDailyItem();        
        await expect(dailyItem).toHaveCSS('background', 'rgba(255, 255, 255, 0.02) none repeat scroll 0% 0% / auto padding-box border-box');
        await expect(dailyItem).toHaveText(/Day 1/);
        
    })

    test('Daily item state "Used"', async({page})=>{
        const bountyService= new BountyServiceAPI(page);
        await bountyService.mockDailyEnergyBoxState('Used');
        let home = new HomePage(page, ENVIRONMENT);        
        await home.openPage();
        await expect(home.getDailyBox()).toBeVisible();
        const dailyItem=home.getDailyItem();
        await expect(dailyItem).toHaveClass(/daily__item-used/);
        await expect(dailyItem).toHaveCSS('background', /url\(".*\/img\/daily-box\/star\.svg"\) no-repeat .* linear-gradient\(137deg, rgb\(128, 255, 156\) 1\.23%, rgb\(20, 138, 46\) 86\.63%\)/);
                
    })

    test('Daily box disabled', async({page})=>{
        const bountyService= new BountyServiceAPI(page);
        await bountyService.mockDailyEnergyBoxIsEnabled(false);
        let home = new HomePage(page, ENVIRONMENT);        
        await home.openPage();
        const dailyItem=home.getDailyItem();
        await expect(home.getDailyBox()).toBeHidden();
    })
    test.afterEach(async ({ page }) => {
        page.close();        
    });
})