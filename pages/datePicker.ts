import { Locator, Page, expect } from "@playwright/test";

export class DatePickerPage{

    private readonly page: Page
    readonly formPickerInputField: Locator
    readonly rangePickerInputField: Locator
    readonly calendarMonthYearField: Locator
    readonly navigationButtonRight: Locator
    readonly navigationButtonLeft: Locator

    constructor(page: Page){
        this.page = page
        this.formPickerInputField = this.page.getByPlaceholder('Form Picker')
        this.rangePickerInputField = this.page.getByPlaceholder('Range Picker')
        this.calendarMonthYearField = this.page.locator('nb-calendar-view-mode')
        this.navigationButtonRight = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        this.navigationButtonLeft = this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]')
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number){  
        await this.formPickerInputField.click()
        const date = await this.selectDateFromToday(numberOfDaysFromToday)
        if(numberOfDaysFromToday === 0){
            await this.page.locator('[class="today day-cell ng-star-inserted"]').getByText(date.getDate().toString(), {exact: true}).click()
        } else {
            await this.page.locator('[class="day-cell ng-star-inserted"]').getByText(date.getDate().toString(), {exact: true}).click()
        }
        const dateToAssert = await this.formDateAssertion(date)
        await expect(this.formPickerInputField).toHaveValue(dateToAssert)
    }

    async selectRangeDatePickerDateFromToday(startDaysFromToday: number, duration: number){
        await this.rangePickerInputField.click()

        let startDate = await this.selectDateFromToday(startDaysFromToday)
        if(startDaysFromToday === 0){
            await this.page.locator('[class="range-cell day-cell today ng-star-inserted"]').getByText(startDate.getDate().toString(), {exact: true}).click()
        } else {
            await this.page.locator('[class="range-cell day-cell ng-star-inserted"]').getByText(startDate.getDate().toString(), {exact: true}).click()
        }
        let endDate = await this.selectDateFromToday(startDaysFromToday + duration, startDaysFromToday)
        if(startDaysFromToday + duration === 0){
            await this.page.locator('[class="range-cell day-cell today ng-star-inserted"]').getByText(endDate.getDate().toString(), {exact: true}).click()
        } else {
            await this.page.locator('[class="range-cell day-cell ng-star-inserted"]').getByText(endDate.getDate().toString(), {exact: true}).click()
        }
        let tempDate: Date
        if(duration < 0){
            tempDate = startDate
            startDate = endDate
            endDate = tempDate
        }
        const startDateToAssert = await this.formDateAssertion(startDate)
        const endDateToAssert = await this.formDateAssertion(endDate)
        const dateToAssert = `${startDateToAssert} - ${endDateToAssert}`
        await expect(this.rangePickerInputField).toHaveValue(dateToAssert)
    }

    private async selectDateFromToday(dayFromToday: number, startDay = 0){
        let date = new Date()
        date.setDate(date.getDate() + dayFromToday)
        const expectedYear = date.getFullYear()

        let calendarMonthYear = await this.calendarMonthYearField.textContent()
        const expectedMonthFull = date.toLocaleString('En-US', {month: 'long'})
        const expectedMonthYear = ` ${expectedMonthFull} ${expectedYear} `

        while(!calendarMonthYear.includes(expectedMonthYear)) {
            if (dayFromToday < startDay){
                await this.navigationButtonLeft.click()
            } else {
                await this.navigationButtonRight.click()
            }
            calendarMonthYear = await this.calendarMonthYearField.textContent()
        }

        return date
    }

    private async formDateAssertion(date: Date){
        const expectedDate = date.getDate().toString()
        const expectedMonth = date.toLocaleString('En-US', {month: 'short'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonth} ${expectedDate}, ${expectedYear}`
        return dateToAssert
    }
}