import { expect } from "@playwright/test";


export class HomePage{

    constructor(page,env){
        this.page=page;
        this.env=env;
    }

    async openPage(){
        await this.page.goto('https://'+this.env+'.questera.games/home');
    }



}