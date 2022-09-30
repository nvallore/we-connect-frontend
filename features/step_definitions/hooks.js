const { Before, After } = require("@cucumber/cucumber");
const { Builder, until, By, Capabilities } = require("selenium-webdriver");
const capabilities = Capabilities.chrome();
capabilities.set("chromeOptions", { "w3c": false });
require("chromedriver");

Before({ timeout: 60000 }, async function () {
    this.URL = `http://127.0.0.1:3000/we-connect-frontend`
    try {
        this.driver = new Builder()
            .withCapabilities(capabilities)
            .build();
        await this.driver.manage().setTimeouts({
            implicit: 60 * 1000, pageLoad:
                30 * 1000, script: 30 * 1000
        });
        await this.driver.get(this.URL);
        await this.driver.manage().window().maximize();
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(By.id('userLoginName'))))
    }
    catch (exception) {
        console.log("Unable to start driver ", exception);
    }

});

After({timeout: 60000}, async function() {
    this.driver.quit()
})