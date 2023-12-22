import { Page } from "@playwright/test";

export class HelperBase{

    readonly page: Page

    constructor(page:Page){
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds*1000)
    }

    randomString(length: number){

        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ''
        for (let i = 0; i < length; i++){
            result += characters[Math.floor(Math.random() * characters.length)]
        }

        return result
    }

    randomEmail(length = 5){
        const emailUserName = this.randomString(length)

        const domain = ['gmail.com', 'hotmail.com', 'citromail.hu', 'freemail.hu']
        const randomNumber = Math.floor(Math.random() * domain.length)

        return emailUserName+'@'+domain[randomNumber]
    }
}