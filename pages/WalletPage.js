

export class WalletPage{

    constructor(page,env){
        this.page=page;
        this.env=env;

        this.profileTitle=page.locator('div.profile__title');
    }

    getProfileTitle(){
        return this.profileTitle;
    }

    
}