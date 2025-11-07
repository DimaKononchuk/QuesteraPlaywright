

export class LoginPage{

    constructor(page,env){
        this.page=page;
        this.env=env
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/');
    }

    
    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }

    
    async loginWithProvider(provider) {
        await this.page.getByRole('button', { name: provider }).click();
    }

    
    async loginWithEmail(email, password) {
        await this.page.getByRole('button', { name: 'Email' }).click();
        await this.page.locator('input[formcontrolname="email"]').fill(email);
        await this.page.locator('input[formcontrolname="password"]').fill(password);
        await this.page.locator('button[type="submit"]').click();
    }


}