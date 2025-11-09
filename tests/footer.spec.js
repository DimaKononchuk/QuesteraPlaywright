import test, { page,expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { Footer } from "../pages/Footer";


const ENVIRONMENT=process.env.TEST_ENVIRONMENT;
let providers=[
        { name: 'discord', urlRegex: /discord\.com\/invite/, checkText: 'Questera' },
        { name: 'youtube', urlRegex: /youtube\.com/, checkText: 'Questera'},
        { name: 'instagram',urlRegex: /instagram\.com\/questera_games/, checkText:'questera_games'},
        { name: 'twitter', urlRegex: /x\.com\/QUESTERA_GAMES/, checkText: 'Questera' },
        { name: 'tiktok', urlRegex: /tiktok\.com\/@questera\.games/, checkText:'questera.games'}
    ]

test.describe("Footer testing redirect", ()=>{

    let loginPage;    
    for(const provider of providers){
        test(`test redirect ${provider.name} icon`, async ({page,context})=>{
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
})