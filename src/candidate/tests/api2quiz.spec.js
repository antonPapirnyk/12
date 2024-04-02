const { test, expect, request } = require("@playwright/test");
const {
  RegulatoryBodyBuilder,
} = require("./utils/builders/regulatoryBodyBuilder");
const { RoleBuilder } = require("./utils/builders/roleBuilder");
const {createData} = require("./utils/prepareTestData")

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
    const regBodyResponce = await createData("regulatory-bodies", regulatoryBody, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGFwcG9sbG8uY28udWsiLCJyb2xlIjoiQ1JNX0FETUlOIiwic3ViIjoiNjVhOTJjMjJmN2Q0ZTVlZmYxODZmNjk5IiwiaWF0IjoxNzExOTk1Mjc4LCJleHAiOjE3MTI2MDAwNzh9.gOixZ2PJ3NKRmthQuMdZERhBf3F67vF_gd8WuoZha1I")
  
    const role = new RoleBuilder()
    .setName("123")
    .setRegulatoryBody(regBodyResponce.data.id)
    .setStatus("ACTIVE")
    .build();

  const roleResponce = await await createData("roles", role, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGFwcG9sbG8uY28udWsiLCJyb2xlIjoiQ1JNX0FETUlOIiwic3ViIjoiNjVhOTJjMjJmN2Q0ZTVlZmYxODZmNjk5IiwiaWF0IjoxNzExOTk1Mjc4LCJleHAiOjE3MTI2MDAwNzh9.gOixZ2PJ3NKRmthQuMdZERhBf3F67vF_gd8WuoZha1I")
  const roleBodyId = roleResponce.data.id;
  console.log("role body id is ", roleBodyId)
});
