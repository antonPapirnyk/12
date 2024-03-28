const { test, request, chromium, expect } = require("@playwright/test");
const loginPayload = { phoneNumber: "07915232656", password: "admin123" };
let webContext;

test.beforeAll("Log in and save storage data", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://beta-candidate.appollo.co.uk/home");
  await page.locator("#phoneNumber").fill(loginPayload.phoneNumber);
  await page.locator("#password").fill(loginPayload.password);
  await page.locator("[type= 'submit']").click();

  try {
    await page.waitForSelector(".verification-input__character--selected", {
      timeout: 5000,
    });
    for (let i = 0; i < 5; i++) {
      await page.locator(".verification-input__character--selected").type("1");
    }
    await page.locator("[type='submit']").click();
  } catch (error) {
    console.error("Error occurred during SMS code entry:", error);
  }
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@smoke Intercept responce and mock the data", async () => {
    const page = await webContext.newPage()
    await page.goto("https://beta-candidate.appollo.co.uk/home");
    await page.route(
      "https://beta-api.appollo.co.uk/v1/shifts/**",
      async (route) => {
        await route.fetch();
        const fakeResponse = {
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({"data":[],"total":0,"totalPages":0,"currentPage":1}),
        };
        await route.fulfill(fakeResponse);
      }
    );
    await page.locator('//span[text()="Shifts"]').click();
    await page.waitForLoadState("networkidle")
  });
  