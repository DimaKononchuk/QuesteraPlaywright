

export class ZendeskWidget {
    constructor(page) {
        this.page = page;
        this.frame = page.locator('#webWidget');
        this.title = page.locator('[data-testid="widget-title"]');
    }

    async waitForLoad() {
       
        // чекаємо, поки елемент всередині iframe стане видимим
        await this.title.waitFor({ state: 'visible', timeout: 10000 });
    }
    getTitle(){
        return this.title;
    }
    getWidget(){
        return this.frame;
    }
}