const { Given, When, Then } = require('@cucumber/cucumber')
const { By } = require("selenium-webdriver");
const { expect } = require('expect');
const { takeScreenshot } = require('../../lib/screenshots');
const fs = require('fs');

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
}

Given('a user with role {string}', { timeout: 60000 }, async function (role) {
    this.user = role
});

When('the credentials are entered', { timeout: 60000 }, async function () {
    await this.driver.findElement(By.id('userLoginName')).sendKeys(`${this.user}`)
    await this.driver.findElement(By.id('userLoginPassword')).sendKeys('admin')
    // this.encodedString = await takeScreenshot(this.driver);
    // let now = Date.now()
    // await fs.writeFileSync(`./screenshots/Login-${now}.png`, this.encodedString, 'base64');
});

When('the {string} button is clicked', { timeout: 60000 }, async function (buttonOption) {
    await this.driver.findElement(By.xpath(`//button[contains(text(),'${buttonOption}')]`)).click()
    await sleep(1000)
});

Then('the user will be logged in', { timeout: 60000 }, async function () {
    let currURL = await this.driver.getCurrentUrl()
    expect(currURL).toContain('dashboard')
    // this.encodedString = await takeScreenshot(this.driver);
    // let now = Date.now()
    // await fs.writeFileSync(`./screenshots/Login-${now}.png`, this.encodedString, 'base64');
});