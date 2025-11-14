

export class SteamAcountPopup{


    constructor(page){
        this.page=page;
        
        this.popup=page.locator('div.onboarding-modal');
    }
    getPopup(){
        return this.popup;
    }

}