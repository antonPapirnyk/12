const {  expect } = require("@playwright/test");
import {test } from "../fixtures/fixturePages"
const { Login } = require("./utils.js/basicUtils");

const loginPayload = { phoneNumber: "07914890890", password: "admin123" };
let webContext;

test.only("Log in and save storage data", async ({ loginPage, context }) => {
  const cookieFilePath =  "./fixtures/user.json" 
 
  await loginPage.goTo()
  const homePage = await loginPage.doLogin(loginPayload.phoneNumber, loginPayload.password)
  await homePage.page.waitForLoadState("networkidle");
  await context.storageState({ path:  cookieFilePath});
  //webContext = await browser.newContext({ storageState: "state.json" });
});

















test("Check user name", async () => {
  const page = await webContext.newPage();
  await page.goto("https://beta-candidate.appollo.co.uk/home");
  await expect(page.locator(".main-layout__user-name")).toHaveText("M A");
});

test("Check user name 2", async () => {
  const page = await webContext.newPage();
  const NHSvalue = page.locator('//input[@value="NHS"]');
  await page.goto("https://beta-candidate.appollo.co.uk/home");
  await expect(page.locator(".main-layout__user-name")).toHaveText("M A");
  await page.locator('//span[text()="Shifts"]').click();
  await page.locator('//span[text()="Hospital Type"]').click();
  await NHSvalue.check();
  await expect(NHSvalue).toBeChecked();
});
