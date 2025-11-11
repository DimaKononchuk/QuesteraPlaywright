


export class LandingPage{


    constructor(page,env){
        this.page=page;
        this.env=env;

        this.tryFirstChallenge= this.page.locator('button.landing-main-slide__btn');
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/');
    }
    async clickHeaderIcon(icon){
        await this.page.locator(`a[aria-label="${icon}"]`).click();
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log in' }).click();
    }
    async clickRegister() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }
    
    async clickTryFirstChallengeBtn(){
        await this.tryFirstChallenge.click();
    }
    
    async clickPlayChallenges(){
        await this.page.getByRole('button', { name: 'Play Challenges' }).click();
    }

    async clickChallengeNavigation(){
        await this.page.locator('.landing-what-are__nav-item').nth(0).click();
    }
    async clickLuckyBoxNavigation(){
        await this.page.locator('.landing-what-are__nav-item').nth(1).click();
    }
   
    async clickQuestionBlock(){
        await this.page.locator('div.landing-most-popular-questions__block-right-faq').nth(0).click();
    }
    
    getSlideImg(){
        return this.page.locator('div.swiper-slide-active');
    }
}