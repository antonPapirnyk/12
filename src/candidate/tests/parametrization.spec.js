const { test, expect } = require("@playwright/test");
const { POManager } = require("../pages/candidate/POManager");
const testUsers = require("./utils.js/loginTestData.json");

test.beforeEach(async ({ page }) => {
  // const loginPage = new LoginPage(page)
  // loginPage.goTo()
});

for (const testUser of testUsers) {
  test(`Login multiple users. User - ${testUser.fullName}`, async ({ page }) => {
    const manager = new POManager(page);
    const loginPage = manager.getLoginPage();
    const homePage = manager.getHomePage();

    await loginPage.goTo();
    await loginPage.validLogin(testUser.phoneNumber, testUser.password);
    await page.waitForLoadState("networkidle");
    if (await loginPage.smsValidationTitle.isVisible()) {
      await loginPage.fillSmsCode();
    }
    await expect(homePage.userNameLabel).toHaveText(testUser.fullName);
  });
}