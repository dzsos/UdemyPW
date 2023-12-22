import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page : Page

    constructor(page: Page){
        this.page = page
    }

    private async selectMenuGroupItem(menu : string){
        const groupMenuItem = this.page.getByTitle(menu)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false'){
            await groupMenuItem.click()
        }
    }

    async formLayoutMenu(){
        await this.selectMenuGroupItem("Forms")
        await this.page.getByTitle('Form Layouts').click()
    }

}