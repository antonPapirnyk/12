import { test } from "../fixtures/fixturePages.js";
import { expect } from "@playwright/test";
const testUser = require("./utils.js/loginTestData.json");

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goTo();
});

test.describe("@Smoke UI & redirects", async () => {
  test("Should redirect to sign up page", async ({ loginPage }) => {
    const signUpPage = await loginPage.clickOnSignUp();
    await expect(signUpPage.page.url()).toContain(signUpPage.url);
  });
  test("Should clear inputs after reload", async ({ loginPage }) => {
    await loginPage.setPhoneNumber("11111111");
    await loginPage.setPassword("000000000");
    await loginPage.reloadPage();
    await expect(loginPage.phoneNumber, loginPage.password).toBeEmpty();
  });
  test("Should check page title", async ({ loginPage }) => {
    await expect(loginPage.page).toHaveTitle("Novello");
  });
  test("Should check page url", async ({ loginPage }) => {
    await expect(loginPage.page).toHaveURL(
      "https://beta-candidate.appollo.co.uk/sign-in"
    );
  });
  test("Check app store button", async ({ loginPage }) => {
    const page1Promise = loginPage.page.waitForEvent("popup");
    await loginPage.appStoreBtn.first().click();
    const page2 = await page1Promise;
    await expect(page2.locator(".app-header__identity")).toHaveText(
      "Novello Healthcare Limited"
    );
  });
  test("Check google play button", async ({ loginPage }) => {
    const page1Promise = loginPage.page.waitForEvent("popup");
    await loginPage.googlePlayBtn.first().click();
    const page2 = await page1Promise;
    await expect(page2.locator("h1")).toHaveText("Novello Healthcare");
  });
  test("Should redirect to forgot password", async ({ loginPage }) => {
    const resetPasswordPage = await loginPage.clickOnForgotPassword();
    await expect(resetPasswordPage.page.url()).toBe(
      "https://beta-candidate.appollo.co.uk/reset-password"
    );
  });
  test("Should unhide and hide password", async ({ loginPage }) => {
    await loginPage.setPassword("000000000");
    await loginPage.eyeBtn.click();
    await expect(loginPage.password).toHaveAttribute("type", "text");
    await loginPage.eyeBtn.click();
    await expect(loginPage.password).toHaveAttribute("type", "password");
  });
});

test.describe("Valid login", async () => {
  test("@Smoke Successful login", async ({ loginPage }) => {
    await loginPage.goTo();
    const homePage = await loginPage.doLogin(
      testUser[0].phoneNumber,
      testUser[0].password
    );
    await homePage.page.waitForLoadState("networkidle");
    if (await loginPage.smsValidationTitle.isVisible()) {
      await loginPage.fillSmsCode();
    }
    await expect(homePage.userNameLabel).toHaveText(testUser[0].fullName);
  });
});

test.describe("@Smoke Invalid login", async () => {
  test("Should not login with no credentials", async ({ loginPage }) => {
    await loginPage.clickLoginBtn();
    await expect(loginPage.page).toHaveURL(loginPage.url);
    await expect(loginPage.errorPhone).toHaveText('Mobile number is required')
    await expect(loginPage.errorPassword).toHaveText('Password is required')
  });
  test("Should not login with invalid credentials", async ({ loginPage }) => {
    await loginPage.doLogin("07914010010", "aaaaaaa")
    await expect(loginPage.page).toHaveURL(loginPage.url);
    await expect(loginPage.errorPhone).toHaveText('Oops! Your mobile number is incorrect. Please try again.')
  });
  test("Should not login with invalid password", async ({ loginPage }) => {
    await loginPage.doLogin(testUser[0].phoneNumber, "aaaaaaa")
    await expect(loginPage.page).toHaveURL(loginPage.url);
    await expect(loginPage.errorPassword).toHaveText('Oops! Your password is incorrect. Please try again.')
  });
});


















test("@POM @fixture First successful login", async ({
  homePage,
  loginPage,
}) => {
  await loginPage.goTo();
  await loginPage.validLogin(testUser[0].phoneNumber, testUser[0].password);
  await homePage.page.waitForLoadState("networkidle");
  if (await loginPage.smsValidationTitle.isVisible()) {
    await loginPage.fillSmsCode();
  }
  await expect(homePage.userNameLabel).toHaveText(testUser[0].fullName);
});

test("Unsuccessful login with empty email and password", async ({ page }) => {
  await page.locator("[type= 'submit']").click();
  await page.waitForSelector(
    "//div[contains(text(), 'Mobile number is required')]"
  );
  await page.waitForSelector("//div[contains(text(), 'Password is required')]");
  await expect(page.url()).toBe("https://beta-candidate.appollo.co.uk/sign-in");
});

test("Test checkbox", async ({ page }) => {
  await page.locator("//a[@href='/sign-up']").click();
  await page.locator("#process").check();
  await expect(page.locator("#process")).toBeChecked();
});

test("Test finding last element fill text and then clear", async ({ page }) => {
  await page.locator("//a[@href='/sign-up']").click();
  await page
    .locator('//div[@class = "auth-form__inner"] //input')
    .last()
    .fill("hellonoto");
  await page
    .locator('//div[@class = "auth-form__inner"] //input')
    .last()
    .clear();
});

test("Test visibility of logo", async ({ page }) => {
  await expect(page.locator("//img[@alt = 'Novello']")).toBeVisible();
});

test("Check header on sign in", async ({ page }) => {
  await expect(page.locator("//h2")).toContainText("elcom");
});

test("Grab an array of labels form sign up", async ({ page }) => {
  await page.locator("//a[@href='/sign-up']").click();
  console.log(
    await page
      .locator('//div[@class= "auth-form__inner"]//label')
      .allTextContents()
  );
});

test("Wait for load state", async ({ page }) => {
  await page.locator("//a[@href='/sign-up']").click();
  await page.waitForLoadState("networkidle");
  console.log(
    await page
      .locator('//div[@class= "auth-form__inner"]//label')
      .allTextContents()
  );
});

test("Check NHS in shifts filters", async ({ page }) => {
  const NHSvalue = page.locator('//input[@value="NHS"]');
  await page.locator("#phoneNumber").fill("07914890890");
  await page.locator("#password").fill("admin123");
  await page.locator("[type= 'submit']").click();

  try {
    await page.waitForSelector(".verification-input__character--selected", {
      timeout: 5000,
    });
    for (let i = 0; i < 5; i++) {
      await page.locator(".verification-input__character--selected").fill("1");
    }
    await page.locator("[type='submit']").click();
  } catch (error) {
    console.error("Error occurred during SMS code entry:", error);
  }

  await page.locator('//span[text()="Shifts"]').click();
  await page.locator('//span[text()="Hospital Type"]').click();
  await NHSvalue.check();
  await expect(NHSvalue).toBeChecked();

  //input[@value="NHS"]
});

test("Check attribute is exist", async ({ page }) => {
  await expect(page.locator('//a[text()="Forgot password?"]')).toHaveAttribute(
    "hrgef",
    "/reset-password"
  );
});

test("Check app store button", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://beta-candidate.appollo.co.uk/home");
  const link = page.locator(".app-store-btn");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    link.first().click(),
  ]);
  newPage.pause();
  await expect(newPage).toHaveURL(
    "https://apps.apple.com/ua/app/novello-healthcare/id6451440252"
  );
  await expect(newPage.locator("h1")).toContainText("Novello Healthcare");

  //alternative solution
  //   const page1Promise = page.waitForEvent('popup');
  //   await page.getByRole('link').first().click();
  //   const page1 = await page1Promise;
  //   await page1.getByRole('link', { name: 'Novello Healthcare Limited' }).click();
});
