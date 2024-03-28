const { test, expect, request } = require("@playwright/test");

test("Send api request and log responce", async () => {
  const requestContext = await request.newContext();
  const responce = await requestContext.post("https://beta-api.appollo.co.uk/v1/auth/sign-in", {
    data: { phoneNumber: "07914060000", password: "admin123" }
  });
  const jsonn = await responce.json()
  await console.log(jsonn);
});
