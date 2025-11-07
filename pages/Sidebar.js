import { expect } from "@playwright/test";


export class Sidebar{


    constructor (page,env){
        this.page=page;
        this.page=page;

        
    }

    async challengeClick(){
        await this.page.locator('.navigation__activities__item__title', { hasText: 'Challenges' }).nth(1).click();
    }
    
    async calibrationClick(){
        await this.page.locator('.navigation__activities__item', { hasText: 'Calibration' }).nth(1).click();
    }
    async luckyBoxClick(){
        await this.page.locator('.navigation__activities__item', { hasText: 'Lucky Box' }).nth(1).click();
    }
    async goldSeekerClick(){
        await this.page.locator('.navigation__activities__item', { hasText: 'Gold Seeker' }).nth(1).click();
    }
}