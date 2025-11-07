import { expect } from "@playwright/test";


export class LoginPage{

    constructor(page,env){
        this.page=page;
        this.env=env;

        this.emailInput = page.locator('input[formcontrolname="email"]');
        this.passwordInput = page.locator('input[formcontrolname="password"]');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/');
    }

    
    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }

    async clickNeedMoreOptions() {
        await this.page.getByRole('button', { name: 'NEED MORE OPTIONS?' }).click();
    }

    async clickEmail() {
        await this.page.getByRole('button', { name: 'EMAIL' }).click();
    }
    async clickRegister() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async getTitle(){
        return await this.page.locator('div.login-selector__title');
    }
    
    async loginWithProvider(provider) {
        await this.page.getByRole('button', { name: provider }).click();
    }

    
    async loginWithEmail(email, password) {
        await this.page.getByRole('button', { name: 'Email' }).click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    
    
    async registerWithEmail(email, password) {
        
        const checkbox= await this.page.locator('span').first();
        const nextBtn= await this.page.getByRole('button', { name: 'Next' });
        await checkbox.click();
        await expect(nextBtn).toBeDisabled();
        await this.emailInput.fill(email);
        await expect(this.page.getByText('Valid email format')).toBeVisible();
        await nextBtn.click();
        await expect(nextBtn).toBeDisabled();
        await this.passwordInput.fill(password);
        await nextBtn.click();
        
        
        
    }


}