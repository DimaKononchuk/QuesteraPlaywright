

export class CookieBanner{
 
    
    constructor(page){
        this.page=page;


        this.banner=page.locator('.cookie')
    }

    async isVisible() {
        return await this.banner.isVisible();
    }

    getBanner(){
        return this.banner;
    }
    getLink(link){
        return this.page.locator('.cookie__description a',{hasText: link})
    }
    async clickLink(link){
        return this.page.locator('.cookie__description a',{hasText: link}).click();
    }

    async clickClose(){
        await this.page.locator(".cookie__close-btn").click();
    }

    async clickDontShowAgain(){
        await this.page.locator(".cookie .btn-secondary").click();
    }

}