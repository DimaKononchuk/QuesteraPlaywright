

export class OverlayPage{


    constructor(page){
        this.page=page;
        this.title=page.locator('div.overlay__header-title')
    }

    getTitle(){
        return this.title;
    }
}