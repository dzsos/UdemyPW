import { Page } from "@playwright/test";

export class NavigationPage {

    private readonly page : Page

    constructor(page: Page){
        this.page = page
    }

}