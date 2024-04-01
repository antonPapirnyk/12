const {expect} = require('@playwright/test')
import { test } from '../fixtures/fixturePages'

test("Upload file", async({loginPage})=>{
    await loginPage.goTo()
    await loginPage.doLogin("07914000000", "admin123")
    await loginPage.page.locator('//span[text()= "Documents"]').click()
    await loginPage.page.locator('//h3[text()= "Identity & Right to Work"]').click()
    await loginPage.page.locator('//h4[text()= "Additional Photo ID"]//parent::div//span[text()="Upload file"]').click()
    const upload = loginPage.page.locator('//input[@id="files"]')
    await upload.setInputFiles('/Users/antonpapirnyk/Documents/learn/playwright/test-images/hello.png')
    await loginPage.page.pause()
})