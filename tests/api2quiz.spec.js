const { test, expect, request } = require("@playwright/test");
const {
  RegulatoryBodyBuilder,
} = require("./utils/builders/regulatoryBodyBuilder");
const { RoleBuilder } = require("./utils/builders/roleBuilder");

test("Send api request and log responce", async ({ request }) => {
  const response = await request.post(
    "https://beta-api.appollo.co.uk/v1/auth/sign-in",
    {
      data: { phoneNumber: "07914000000", password: "admin123" },
    }
  );
  await expect(response).toHaveStatusText("OK");
});

test.only("Should create regBody via API using builder", async ({
  request,
}) => {
  const regulatoryBody = new RegulatoryBodyBuilder()
    .setName("Super")
    .setStatus("ACTIVE")
    .setValidationFormat(["ABDC###"])
    .build();
  const responce = await request.post(
    "http://localhost:3000/v1/regulatory-bodies",
    {
      data: regulatoryBody,
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGFwcG9sbG8uY28udWsiLCJyb2xlIjoiQ1JNX0FETUlOIiwic3ViIjoiNjVhOTJjMjJmN2Q0ZTVlZmYxODZmNjk5IiwiaWF0IjoxNzExOTk1Mjc4LCJleHAiOjE3MTI2MDAwNzh9.gOixZ2PJ3NKRmthQuMdZERhBf3F67vF_gd8WuoZha1I",
      },
    }
  );
  const body = await responce.json();
  console.log(typeof body.id);

  const role = new RoleBuilder()
    .setName("123")
    .setRegulatoryBody(body.id)
    .setStatus("ACTIVE")
    .build();

  const responceRole = await request.post("http://localhost:3000/v1/roles", {
    data: role,
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGFwcG9sbG8uY28udWsiLCJyb2xlIjoiQ1JNX0FETUlOIiwic3ViIjoiNjVhOTJjMjJmN2Q0ZTVlZmYxODZmNjk5IiwiaWF0IjoxNzExOTk1Mjc4LCJleHAiOjE3MTI2MDAwNzh9.gOixZ2PJ3NKRmthQuMdZERhBf3F67vF_gd8WuoZha1I",
    },
  });
  const bodyRole = await responceRole.json();
  console.log(bodyRole);
});
