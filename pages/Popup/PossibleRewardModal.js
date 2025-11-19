
import { expect } from "@playwright/test";
import { RewardServiceAPI } from "../../helpers/RewardServiceAPi";


export class PossibleRewardModal{


    constructor(page){
        this.page=page;

        this.modal=page.locator('app-possible-rewards-modal');
        this.title=page.locator('app-possible-rewards-modal .text-primary');
        this.rewardNumber=page.locator('app-possible-rewards-modal .reward-modal__reward-item span');
        this.close=page.locator('svg-icon[icon="close"]').nth(1);
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

    async checkModal() {
        const rewardService=new RewardServiceAPI(this.page);
        let number= (await rewardService.getRewardUserList())[0].amount;
        await expect(this.modal).toBeVisible();
        await expect(this.title).toHaveText(/reward/);
        await expect(this.rewardNumber).toHaveText(String(number));
        
    }

}