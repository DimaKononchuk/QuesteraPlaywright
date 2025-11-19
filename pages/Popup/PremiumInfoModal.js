import { expect } from "@playwright/test";


export class PremiumInfoModal{


    constructor(page){
        this.page=page;

        this.modal=page.locator('app-premium-info-modal');
        this.title=page.locator('app-premium-info-modal .premium-info__title');
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

    async checkModal(){
        await expect(this.modal).toBeVisible();
        await expect(this.title).toHaveText(/How ToGet Reward/);
    }
}