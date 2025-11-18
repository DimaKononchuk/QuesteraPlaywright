import { expect } from "@playwright/test";


export class HomePage{

    constructor(page,env){
        this.page=page;
        this.env=env;
        
        this.startedBlock=page.locator('div.started-main-wrapper');
        this.startedItem=page.locator('div.started-item')
        this.dailyBox=page.locator('div.daily');
        this.dailyItem=page.locator('div.daily__item').first();
    
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/home');
    }

    getStartedBlock(){
        return this.startedBlock;
    }
    getStartedItem(item){
        return this.startedItem.filter({hasText:item});
    }

    getDailyBox(){
        return this.dailyBox;
    }
    getDailyItem(){
        return this.dailyItem;
    }



}