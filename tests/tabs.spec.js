const {test, expect} = require('@playwright/test')

test("Interacting with 2 tabs", async({page, context})=>{
    await page.goto("https://beta-candidate.appollo.co.uk/")
    const newPage = await context.newPage()
    await newPage.goto("https://beta-crm.appollo.co.uk/")
    await page.bringToFront()
    await page.pause()
    await newPage.close()
    await page.pause()
})