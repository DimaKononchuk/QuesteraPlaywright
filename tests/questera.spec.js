// @ts-check
import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { describe } from 'node:test';

test.describe("check landing",()=>{
    
    test("btn visible check", async ({page})=>{
    const landingPage=new LandingPage(page);
    await landingPage.goTo();
    await landingPage.loginBtnToBeVisible();
    await landingPage.registerBtnToBeVisible();

    })
    test("check redirect click 'Login'",async ({page})=>{
        const landingPage=new LandingPage(page);
        await landingPage.goTo();
        await landingPage.clickLogin();
        await landingPage.loginTitle();
        await landingPage.checkLoginText();
    })
    test("check redirect click 'Register'",async ({page})=>{
        const landingPage=new LandingPage(page);
        await landingPage.goTo();
        await landingPage.clickRegister();
        await landingPage.registerTitle();
        await landingPage.checkRegisterText();
    })
})
