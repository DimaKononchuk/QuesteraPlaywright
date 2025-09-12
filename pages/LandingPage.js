import { expect } from "@playwright/test";

export class LandingPage{

    
    constructor(page){
        this.page=page;
        this.loginBtn=page.getByRole('button', { name: 'Log in' });
        this.registerBtn=page.getByRole('button', { name: 'Register' });
        this.title=page.locator("xpath=//div[contains(@class,'login-selector__title')]")
        this.description=page.locator("xpath=//div[contains(@class,'login-selector__description')]")
    }

    async goTo(){
        await this.page.goto("https://dev.questera.games/")
    }

    async loginBtnToBeVisible(){
        await expect(this.loginBtn).toBeVisible();
    }
    async registerBtnToBeVisible(){
        await expect(this.registerBtn).toBeVisible();
    }
    async clickLogin(){
        await this.loginBtn.click();
    }
    async clickRegister(){
        await this.registerBtn.click();
    }

    async loginTitle(){
        await expect(this.page).toHaveTitle("Questera Auth")
    }
    async registerTitle(){
        await expect(this.page).toHaveTitle("Questera Auth")
    }
    async mainLandingTitle(){
        await expect(this.page).toHaveTitle("Win Real Rewards Playing Dota2 - bet on your Dota2 match result | Questera")
    }

    async checkRegisterText(){
        await expect(this.title).toHaveText("Create account");
        await expect(this.description).toHaveText("Choose a register method to continue");
    }
    async checkLoginText(){
        await expect(this.title).toHaveText("Log in to platform");
        await expect(this.description).toHaveText("Choose a login method to continue");
    }
}