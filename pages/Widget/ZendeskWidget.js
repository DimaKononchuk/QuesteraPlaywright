

export class ZendeskWidget {
    constructor(page) {
        this.page = page;
        this.frame = page.locator('#webWidget')
    }

    getWidget(){
        return this.frame;
    }
}