import { Page, expect } from "@playwright/test"
import { HelperBase } from "../helpers/helperBase"

export class FormLayoutsPage extends HelperBase{

    constructor(page : Page){
        super(page)
    }

    async fillInlineBox(userName: string, email: string, rememberMe = false){
        const blockItem = this.page.locator('nb-card', {hasText: 'Inline form'})
        await blockItem.getByPlaceholder('Jane Doe').fill(userName)
        await blockItem.getByPlaceholder('Email').fill(email)
        if(rememberMe){
            await blockItem.getByRole('checkbox').check({force: true})
            await expect(blockItem.getByRole('checkbox')).toBeChecked()
        }
        await blockItem.getByRole('button').click()
        const userValue = await blockItem.getByPlaceholder('Jane Doe').inputValue()
        const emailValue = await blockItem.getByPlaceholder('Email').inputValue()
        expect(userValue).toEqual(userName)
        expect(emailValue).toEqual(email)
    }

    async fillInUsingTheGridBox(email: string, password: string, option: string){
        const blockItem = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await blockItem.getByRole('textbox', {name: 'Email'}).fill(email)
        await blockItem.getByRole('textbox', {name: 'Password'}).fill(password)
        await blockItem.getByRole('radio', {name: option}).check({force: true})
        await blockItem.getByRole('button', {name: 'Sign in'}).click()
        expect(await blockItem.getByRole('radio', {name: option}).isChecked()).toBeTruthy()
        expect(await blockItem.getByRole('textbox', {name: 'Email'}).inputValue()).toEqual(email)
        expect(await blockItem.getByRole('textbox', {name: 'Password'}).inputValue()).toEqual(password)
    }
}