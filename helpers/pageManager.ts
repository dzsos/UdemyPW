import { Page } from "@playwright/test";
import { NavigationPage } from "../pages/NavigationPage";
import { FormLayoutsPage } from "../pages/FormLayoutsPage";
import { HelperBase } from "./helperBase";

export class PageManager extends HelperBase{
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage

    constructor(page: Page){
        super(page)
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