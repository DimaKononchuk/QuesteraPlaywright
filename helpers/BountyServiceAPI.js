

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
}