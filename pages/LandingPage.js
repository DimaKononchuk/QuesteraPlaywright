


export class LandingPage{


    constructor(page,env){
        this.page=page;
        this.env=env;

        this.tryFirstChallenge= page.locator('button.landing-main-slide__btn');
        this.questionBlock=page.locator('div.landing-most-popular-questions__block-right-faq').nth(0);
        this.answerBlock=page.locator('div.landing-most-popular-questions__block-right-faq__answer').nth(0);
        this.landingLanguage=page.locator('.landing__language-btn');
        this.landingLanguageMenu=page.locator('.landing__language-menu');
        this.landingLanguageItem=page.locator('.language-menu__item');
    }


    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/');
    }

    getTitle(){
        return this.page.locator('.landing-main-slide__title');
    }
    getQuestionBlock(){
        return this.questionBlock;
    }
    getAnswerBlock(){
        return this.answerBlock;
    }


    getCashClashBlock(){
        return this.page.locator('.clash__main-wrapper');
    }
    getGoldSeekerBlock(){
        return this.page.locator('.seeker-block');
    }
    
    getLandingLanguage(){
        return this.landingLanguage;
    } 

    getLandingLanguageMenu(){
        return this.landingLanguageMenu;
    }

    getLandingLanguageItem(){
        return this.landingLanguageItem;
    }
    async clickLandingLanguageItem(language){
        await this.landingLanguageItem.filter({hasText:language}).click({force:true});
    }
    async clickLandingLanguage(){
        await this.landingLanguage.click();
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
        await this.questionBlock.click();
    }
    async clickSupportTeamLink(){
        await this.page.locator('.support-team-link').click();
    }
    async clickToUpPrizePoolBtn(){
        await this.page.locator('.btn-clash-secondary').nth(1).click();
    }
    async clickGSStartNow(){
        await this.page.locator('[aria-label="Gold Seeker"]').click();
    }
    getSlideImg(){
        return this.page.locator('div.swiper-slide-active');
    }
    
}