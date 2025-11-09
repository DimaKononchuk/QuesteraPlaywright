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

const footerLinks=[
    {name:'FAQ', url:'/terms-of-service'},
    {name:'How it work', url:'/cookie-policy'},
    {name:'Terms of Use', url:'/refund-policy'},
    {name:'Privacy Policy', url:'/eula'},
    {name:'Refund Policy', url:'/eula'}
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
        await expect(page.getByTestId('widget-title')).toBeVisible({timeout:60000});
    })


})