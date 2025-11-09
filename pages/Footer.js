


export class Footer{



    constructor(page,env){
        this.page=page;
        this.env=env;
    }

    async clickHelp(){
        await this.page.locator('.footer__link',{hasText:'Help'}).click();
    }

    
    async clickFAQ(){
        await this.page.locator('.footer__link',{hasText:'FAQ'}).click();
    }

    async clickHowItWorks(){
        await this.page.locator('.footer__link',{hasText:'How It Works'}).click();
    }

    async clickTermsOfUse (){
        await this.page.locator('.footer__link',{hasText:'Terms of Use'}).click();
    }

    async clickPrivacyPolicy  (){
        await this.page.locator('.footer__link',{hasText:'Privacy Policy'}).click();
    }

    async clickRefundPolicy  (){
        await this.page.locator('.footer__link',{hasText:'Refund Policy'}).click();
        
    }

    async clickIcon(icon){
        await this.page.locator(`svg-icon.footer__social-item use[href*="#${icon}"]`).click();
    }


}