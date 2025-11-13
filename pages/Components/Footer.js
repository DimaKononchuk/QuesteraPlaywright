


export class Footer{



    constructor(page,env){
        this.page=page;
        this.env=env;
    }


    async clickFooterLink(link){
        await this.page.locator('.footer__link',{hasText:link}).click();
        
    }
    
    async clickIcon(icon){
        await this.page.locator(`.footer__social-item_${icon}`).click();
    }


}