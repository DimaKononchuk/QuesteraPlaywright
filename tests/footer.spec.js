import test, { page,expect } from "@playwright/test";
import { LoginPage } from '../pages/LoginPage';
import { Footer } from "../pages/Footer";


const ENVIRONMENT=process.env.TEST_ENVIRONMENT;


text.describe("Footer testing redirect", ()=>{

    let loginPage;

    let providers=[
        { name: 'Discord', urlRegex: /discord\.com\/invite/, checkText: 'Questera' },
        { name: 'Youtube', urlRegex: /youtube\.com\/questera/, checkText: 'Questera'},
        { name: 'Instagram',urlRegex: /instagram\.com\/questera_games/, checkText:'questera_games'},
        { name: 'Twitch', urlRegex: /x\.com\/questera_games/, checkText: 'Questera' },
        { name: 'Tiktok', urlRegex: /tiktok\.com\/questera_games/, checkText:'questera.games'}
    ]
    for(const provider of providers){
        test(`test redirect ${icon} icon`, async({page})=>{
            loginPage=new LoginPage(page,ENVIRONMENT);
            const footer=new Footer(page,ENVIRONMENT);
            footer.clickIcon(provider.name);
            await page.waitForURL(provider.urlRegex);
            await expect(page.getByText(provider.checkText)).toBeVisible({timeout:60000});

        })
    }
})