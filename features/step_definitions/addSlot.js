const { Given, When, Then } = require('@cucumber/cucumber')
const { By, Key } = require("selenium-webdriver");
const { expect } = require('expect');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

Given('user navigates to {string} section', { timeout: 60000 }, async function (section) {
    switch (section.toLowerCase()) {
        case 'profile':
            await this.driver.findElement(By.id('dashboardProfile')).click()
            await sleep(1000)
            let currURL = await this.driver.getCurrentUrl()
            expect(currURL).toContain('dashboard/profile')
            break;
        default:
            console.log('No such sections available.')
    }
});

When('the date is set', { timeout: 60000 }, async function () {
    let inputFieldToClear = await this.driver.findElement(By.id('slotDatePicker'))
    await this.driver.executeScript(elt => elt.select(), inputFieldToClear);
    await inputFieldToClear.sendKeys(Key.BACK_SPACE);
    await this.driver.findElement(By.id('slotDatePicker')).sendKeys('09/26/2023  Tue 10:00 PM')
})

Then('a slot is created', {timeout: 60000}, async function() {
    
})