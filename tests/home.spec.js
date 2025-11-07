import test, { page,expect } from "@playwright/test";
import { HomePage } from '../pages/HomePage';
import { Sidebar } from '../pages/Sidebar';

const ENVIRONMENT=process.env.TEST_ENVIRONMENT;



test.describe('(Home Page) testing redirect',()=>{

    test("click Challenges", async({page})=>{
        const home = new HomePage(page,ENVIRONMENT);
        const sidebar= new Sidebar(page,ENVIRONMENT);
        await home.openPage();
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
        await sidebar.challengeClick();
        await expect(page).toHaveURL(/\/Dota2\/challenges\/TurboMode/);
    })

    test("click Calibration", async({page})=>{
        const home = new HomePage(page,ENVIRONMENT);
        const sidebar= new Sidebar(page,ENVIRONMENT);
        await home.openPage();
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
        await sidebar.calibrationClick();
        await expect(page).toHaveURL(/\/Dota2\/calibration\/TurboMode/);
    })

    test("click Lucky Box", async({page})=>{
        const home = new HomePage(page,ENVIRONMENT);
        const sidebar= new Sidebar(page,ENVIRONMENT);
        await home.openPage();
        await expect(page.getByRole('button', { name: 'Buy Energy' })).toBeVisible();
        await sidebar.luckyBoxClick();
        await expect(page).toHaveURL(/\/Dota2\/lucky-box/);
    })


})
