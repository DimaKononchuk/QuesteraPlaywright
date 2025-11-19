import { expect } from "@playwright/test";


export class HomePage{

    constructor(page,env){
        this.page=page;
        this.env=env;
        
        this.startedBlock=page.locator('div.started-main-wrapper');
        this.startedItem=page.locator('div.started-item')
        this.dailyBox=page.locator('div.daily');
        this.dailyItem=page.locator('div.daily__item').first();
        this.randomBox=page.locator('div.random-box');
        

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

    getMegaBox(){
        return this.megaBox;
    }

    getEnergyBox(){
        return this.energyBox;
    }

    getBox(type) {
        return {
            box: this.page.locator(`div.daily__${type}`),
            icon: this.page.locator(`div.daily__${type}__icon`),
            button: this.page.locator(`button.daily__${type}__button`)
        };
    }

    get energyBox() {
        return this.getBox('energy');
    }

    get megaBox() {
        return this.getBox('mega');
    }

}