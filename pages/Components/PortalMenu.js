


export class PortalMenu{

    constructor(page){
        this.page=page;

        this.portalMenu=page.locator('div.portal__menu');
        this.portalMenuItem=page.locator('div.portal__menu div.game-button');
    }

    getPortalMenu(){
        return this.portalMenu;
    }

    getPortalMenuItem(item){
        return this.portalMenuItem.filter({hasText:item});
    }
}