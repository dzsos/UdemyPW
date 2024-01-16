import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText("Forms").click()
    await page.getByText("Form Layout").click()
})

test.skip("Locator syntax rules", async ({page}) => {
    //by Tag name
    page.locator('input').first().click()

    //by ID
    page.locator('#inputEmail')

    //by Class
    page.locator('.shape-rectangle')

    //by Attribute
    page.locator('[placeholder="Email"]')

    //by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email]')

    //by XPath NOT RECOMMENDED
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using Grid")')

})

test("User facing locators", async ({page}) => {
    await page.getByRole("textbox", {name: "Email"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText("Using the Grid").click()

    await page.getByTestId("SignIn").click()

    await page.getByTitle("IoT Dashboard").click()  
})

test("Child element", async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    //NOT RECOMMENDED: first, last, indexes
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).nth(1).click()
})

test("Parent element", async ({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole("textbox", {name: "Email"}).click()

    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole("textbox", {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole("textbox", {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole("button").click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
        .getByRole("textbox", {name: "Email"}).click()

    //NOT RECOMMENDED
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole("textbox", {name: "Email"}).click()
})

test("Reusing", async ({page}) => {

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole("textbox", {name: "Email"})

    await emailField.fill('aaa@aaa.hu')
    await basicForm.getByRole("textbox", {name: "Password"}).fill('ppp111')
    await basicForm.getByRole("button").click()

    await expect(emailField).toHaveValue('aaa@aaa.hu')
})

test("gain values", async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()

    expect(buttonText).toEqual("Submit")

    const allradio = await page.locator('nb-radio').allTextContents()
    expect(allradio).toContain("Option 1")

    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill("blabla@ggg.hu")
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('blabla@ggg.hu')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual("Email")
})

test("assertions", async ({page}) => {
    //General assertion
    const value = 5
    expect(value).toEqual(5)

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicFormButton).toHaveText("Submit")

    //Soft assertion - Not a good practice
    await expect.soft(basicFormButton).toHaveText("Submit5")
    await basicFormButton.click()
})