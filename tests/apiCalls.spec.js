const { test, request, chromium, expect } = require("@playwright/test");
const { Login } = require("./utils.js/basicUtils");

const loginPayload = { phoneNumber: "07914890890", password: "admin123" };
let token;

test.beforeAll("Log in with access token", async () => {
  const apiContext = await request.newContext();
  const login = new Login(apiContext, loginPayload);
  token = await login.getToken();
});

test("Check user name", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("accessToken", value);
  }, token);

  await page.goto("https://beta-candidate.appollo.co.uk/home");
  await expect(page.locator(".main-layout__user-name")).toHaveText("M A");
});

test("Check paid timesheets", async ({ page }) => {
  const hello = await request.newContext();
  const responeWithTimesheets = await hello.get(
    "https://beta-api.appollo.co.uk/v1/time-sheets/statistics?candidateIdsIn[]=655736f82984f7bcb9fbf740&statusIn[]=PAID",
    {
      data: loginPayload,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const responceBody = await responeWithTimesheets.json();
  const responceToString = JSON.stringify(responceBody);
  expect(responceToString).toContain('"bookedShifts":4');
}); 

// test.only("Intercept responce", async ({ page }) => {
//   await page.addInitScript((value) => {
//     window.localStorage.setItem("accessToken", value);
//   }, token);
//   //const hello = await request.newContext()
//   await page.route(
//     "https://beta-api.appollo.co.uk/v1/shifts/**",
//     async (route) => {
//       const response = await route.fetch();
//       const fakeResponse = {
//         status: 200,
//         contentType: "application/json",
//         body: JSON.stringify({"data":[],"total":0,"totalPages":0,"currentPage":1}),
//       };
//       await route.fulfill(fakeResponse);
//     }
//   );
//   await page.goto("https://beta-candidate.appollo.co.uk/home");
//   await page.locator('//span[text()="Shifts"]').click();

// });
