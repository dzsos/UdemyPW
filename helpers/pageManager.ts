import { Page } from "@playwright/test";
import { NavigationPage } from "../pages/NavigationPage";
import { FormLayoutsPage } from "../pages/FormLayoutsPage";

export class PageManager{
    readonly page : Page
    readonly navigationPage: NavigationPage
    readonly formLayoutsPage: FormLayoutsPage

    constructor(page: Page){
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }
}