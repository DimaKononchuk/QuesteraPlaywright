import { console } from "inspector";


export class BountyServiceAPI{
    


    constructor(page){
        this.page=page;
    }


    async mockDailyEnergyBoxState(state){
        await this.page.route('**/bounty/daily-energy-box', async route => {
            const originalResponse = await route.fetch();
            const data = await originalResponse.json();
            data.rewards[0].state = state;

            await route.fulfill({
                response: originalResponse, 
                body: JSON.stringify(data)
            });
        });
    }

    async mockDailyEnergyBoxIsEnabled(enabled){
        await this.page.route('**/bounty/daily-energy-box', async route => {
            const originalResponse = await route.fetch();
            const data = await originalResponse.json();
            data.isEnabled=enabled;

            await route.fulfill({
                response: originalResponse, 
                body: JSON.stringify(data)
            });
        });
    }

    async mockBoxDisabled(type){
        await this.page.route('**/bounty/random-box/status', async route => {
            const originalResponse = await route.fetch();
            const json = await originalResponse.json();
            json.data = json.data.filter(item => item.type !== type);
            
            await route.fulfill({
                response: originalResponse, 
                body: JSON.stringify(json)
            });
        });

    }

    async mockBoxState(type,state){
        await this.page.route('**/bounty/random-box/status', async route => {
            const originalResponse = await route.fetch();
            const json = await originalResponse.json();
            json.data.find(e=>e.type===type).status=state;
            
            await route.fulfill({
                response: originalResponse, 
                body: JSON.stringify(json)
            });
        });
    }

    async getRewardUserList(){
        await this.page.route('**/bounty/random-box/status', async route => {
            const originalResponse = await route.fetch();
            const json = await originalResponse.json();
            json.data.find(e=>e.type===type).status=state;
            
            await route.fulfill({
                response: originalResponse, 
                body: JSON.stringify(json)
            });
        });
    }
}