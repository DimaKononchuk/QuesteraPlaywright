import { RewardServiceAPI } from "../../helpers/RewardServiceAPi";
import { expect } from "@playwright/test";

export class RewardModal{


    constructor(page){
        this.page=page;

        this.modal=page.locator('app-reward-modal');
        this.title=page.locator('app-reward-modal .reward-modal__title');
        this.close=page.locator('svg-icon[icon="close"]').nth(1);
        this.rewardNumber=page.locator('app-reward-modal .reward-modal__reward-item span');
        this.button=page.locator('app-reward-modal .reward-modal__btn',{hasText:'Hurray'});
    }

    get Modal(){
        return this.modal;
    }

    get Title(){
        return this.title;
    }

    get Close(){
        return this.close;
    }

    get Button(){
        return this.button;
    }
    async checkModal(){
        const rewardService=new RewardServiceAPI(this.page);
        let number= (await rewardService.getRewardReward()).amount;
        
        await expect(this.modal).toBeVisible({timeout:20000});
        //await expect(this.title).toHaveText(/ received reward/);
        await expect(this.rewardNumber).toHaveText(String(number));
        await expect(this.button).toBeVisible();
        
    }
}