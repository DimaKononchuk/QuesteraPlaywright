import test, { page,expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { Footer } from "../pages/Footer";


const ENVIRONMENT=process.env.TEST_ENVIRONMENT;
const icon=[
        { name: 'discord', urlRegex: /discord\.com\/invite/, checkText: 'Questera' },
        { name: 'youtube', urlRegex: /youtube\.com/, checkText: 'Questera'},
        { name: 'instagram',urlRegex: /instagram\.com\/questera_games/, checkText:'questera_games'},
        { name: 'twitter', urlRegex: /x\.com\/QUESTERA_GAMES/, checkText: 'Questera' },
        { name: 'tiktok', urlRegex: /tiktok\.com\/@questera\.games/, checkText:'questera.games'}
    ]

const htmlRedirect=[
    {name:'Terms of Use', urlRegex:/cdn\.questera\.games\/docs\/Questera_TOS\.html/, checkText:'Terms of Use'},
    {name:'Privacy Policy', urlRegex:/cdn\.questera\.games\/docs\/Questera_PP\.html/, checkText:'Privacy Policy'},
    {name:'Refund Policy', urlRegex:/cdn\.questera\.games\/docs\/Questera_RP\.html/, checkText:'REFUND AND CANCELLATIONPOLICY'}
]

const zendeskRedirect=[
    {name:'FAQ', urlRegex: /questera\.zendesk\.com/},
    {name:'How it work', urlRegex:/questera\.zendesk\.com/},
]
test.describe("Footer testing redirect", ()=>{

    let loginPage;    
    for(const provider of icon){
        test(`Click ${provider.name} icon`, async ({page,context})=>{
            loginPage=new LoginPage(page,ENVIRONMENT);            
            await loginPage.openPage();
            const footer=new Footer(page,ENVIRONMENT);
            const pagePromise = context.waitForEvent('page');            
            await footer.clickIcon(provider.name);
            const newPage = await pagePromise;
            await newPage.waitForURL(provider.urlRegex);
            await expect(newPage.getByText(provider.checkText).nth(0)).toBeVisible({timeout:60000});

        })
    }


    test('click "Help" footer link', async ({page})=>{
        loginPage=new LoginPage(page,ENVIRONMENT);            
        await loginPage.openPage();
        const footer=new Footer(page,ENVIRONMENT);
        await footer.clickFooterLink('Help');
        const frameLocator = page.frameLocator('#webWidget'); // або конкретний селектор iframe
        await expect(frameLocator.locator('h1[id="widgetHeaderTitle"]')).toBeVisible({ timeout: 60000 });
    })

    for(const link of htmlRedirect){
        test(`click ${link.name} link (html document)`, async({page,context})=>{
            loginPage=new LoginPage(page,ENVIRONMENT);            
            await loginPage.openPage();
            const footer=new Footer(page,ENVIRONMENT);
            const pagePromise = context.waitForEvent('page');            
            await footer.clickFooterLink(link.name);
            const newPage = await pagePromise;
            await newPage.waitForURL(link.urlRegex);
            await expect(newPage.getByText(link.checkText).nth(0)).toBeVisible({timeout:60000});
            
        })
    }

    for(const link of zendeskRedirect){
        test(`click ${link.name} link (zendesk)`, async({page,context})=>{
            loginPage=new LoginPage(page,ENVIRONMENT);            
            await loginPage.openPage();
            const footer=new Footer(page,ENVIRONMENT);
            const pagePromise = context.waitForEvent('page');            
            await footer.clickFooterLink(link.name);
            const newPage = await pagePromise;
            await newPage.waitForURL(link.urlRegex);
            await expect(newPage.getByRole('link', { name: 'Questera Help Center home page' })).toBeVisible({timeout:60000});
            
        })
    }

})