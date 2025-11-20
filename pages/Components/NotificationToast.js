


export class NotificationToast{

    constructor(page){
        this.page=page;

        this.notification=page.locator('ngb-toast');
    }

    get Notification(){
        return this.notification;
    }
}