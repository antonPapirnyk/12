require('dotenv').config()
import { test } from "../fixtures/fixturePages.js";

test("Should visit crm on localhost", async ({ page }) => {
    await page.goto(process.env.CRM_URL)
    await page.locator("#email").fill(process.env.ADMIN_NAME)
    await page.locator("#password").fill(process.env.ADMIN_PASSWORD)
    await page.pause()
});