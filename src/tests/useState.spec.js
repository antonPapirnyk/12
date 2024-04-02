const { expect } = require("@playwright/test");
import { test } from "../../../fixtures/fixturePages";

test.describe("@Loggedin Shoul use state file and kepp user logedin", async () => {
  test.use({ storageState: "./fixtures/user.json" });

  test("Check user name", async ({ homePage }) => {
    await homePage.goTo();
    await expect(homePage.page.locator(".main-layout__user-name")).toHaveText(
      "Smooth Operator"
    );
  });

  test("Check user name 2", async ({ homePage }) => {
    const NHSvalue = homePage.page.locator('//input[@value="NHS"]');
    await homePage.goTo();
    await homePage.page.locator('//span[text()="Shifts"]').click();
    await homePage.page.locator('//span[text()="Hospital Type"]').click();
    await NHSvalue.check();
    await expect(NHSvalue).toBeChecked();
  });
});

 