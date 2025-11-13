


export class Header{

    constructor(page){
        this.page=page;


        this.buyEnergyBtn=page.locator('button.be-premium-btn');
        this.dropDownToogle=page.locator('div#burgerMenu');
        this.avatarIcon=page.locator('div.burger-menu__avatar-wrap');
        this.notificationsMenu=page.locator('#notificationsMenu');
        this.overlayButton=page.locator('div.cc-header__overlay');
        this.logo=page.locator('.cc-header__row-main-logo');

        this.burgerMenu=page.locator('#burgerMenu div[aria-labelledby="burgerMenu"]');
        this.burgerMenuItem=page.locator('#burgerMenu div.game-button');
        this.notificationsMenuList=page.locator('div[aria-labelledby="notificationsMenu"]');
        this.notificationsMenuListItem=page.locator('div[aria-labelledby="notificationsMenu"] .notification');
    }


    getBuyEnergyBtn(){
        return this.buyEnergyBtn;
    }

    getDropDownToogle(){
        return this.dropDownToogle;
    }
    getAvatarIcon(){
        return this.avatarIcon;
    }
    getNotificationsMenu(){
        return this.notificationsMenu;
    }
    getOverlayButton(){
        return this.overlayButton;
    }
    getLogo(){
        return this.logo;
    }
    getBurgerMenu(){
        return this.burgerMenu;
    }
    getBurgerMenuItem(string){
        return this.burgerMenuItem.filter({hasText:string});
    }

    getNotificationsMenuList(){
        return this.notificationsMenuList;
    }
    getNotificationsMenuListItem(){
        return this.notificationsMenuItemList;
    }

}