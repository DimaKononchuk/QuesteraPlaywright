import { console } from "inspector";


export class RewardServiceAPI{
    


    constructor(page){
        this.page=page;
    }

    async getRewardUserList(){
        const response = await this.page.waitForResponse(
            r => r.url().includes('/reward/reward/user-list') && r.status() === 200
        );
        return await response.json();
    }
}