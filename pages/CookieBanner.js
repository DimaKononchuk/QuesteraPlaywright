

export class CookieBanner{
 
    
    constructor(page){
        this.page=page;


        this.banner=page.locator('.cookie')
    }

    async isVisible() {
        return await this.banner.isVisible();
    }


    async clickClose(){
        await this.page.locator(".cookie__close-btn").click();
    }

}