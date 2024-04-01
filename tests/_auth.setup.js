import {test } from "../fixtures/fixturePages"

const loginPayload = { phoneNumber: "07914000000", password: "admin123" };

test("Log in and save storage data", async ({ loginPage, context }) => {
  const cookieFilePath =  "./fixtures/user.json" 
 
  await loginPage.goTo()
  const homePage = await loginPage.doLogin(loginPayload.phoneNumber, loginPayload.password)
  await homePage.page.waitForLoadState("networkidle");
  await context.storageState({ path:  cookieFilePath});
});