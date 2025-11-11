


export class LandingPage{


    constructor(page,env){
        this.page=page;
        this.env=env;
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/');
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }
    async clickRegister() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }
    
    async clickTryFirstChallengeBtn(){
        await this.page.locator('button.landing-main-slide__btn').click();
    }
    async clickPlayChallenges(){
        await this.page.getByRole('button', { name: 'Play Challenges' }).click();
    }

    async clickChallengeNavigation(){
        await this.page.locator('.landing-what-are__nav-item').nth(0).click();
    }
    async clickLuckyBox(){
        await this.page.locator('.landing-what-are__nav-item').nth(1).click();
    }
   
    async clickQuestionBlock(){
        await this.page.locator('div.landing-most-popular-questions__block-right-faq').nth(0).click();
    }

}