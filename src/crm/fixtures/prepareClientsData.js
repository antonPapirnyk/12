import { request, test as base } from "@playwright/test";
require("dotenv").config();
const {
  RegulatoryBodyBuilder,
} = require("../utils/builders/regulatoryBodyBuilder");
const { RoleBuilder } = require("../utils/builders/roleBuilder");
const { createData } = require("../../utils/prepareTestData");
const { AppCRM } = require("../pages/applicationCRM");
const { Login } = require("../../utils/getAuthToken");

const createClientAndRole = async (token) => {
  const regulatoryBody = await new RegulatoryBodyBuilder()
    .setName("Super")
    .setStatus("ACTIVE")
    .setValidationFormat(["ABDC###"])
    .build();
  const regBodyResponce = await createData(
    "regulatory-bodies",
    regulatoryBody,
    token
  );

  const role = await new RoleBuilder()
    .setName("123")
    .setRegulatoryBody(regBodyResponce.data.id)
    .setStatus("ACTIVE")
    .build();
  const roleResponce = await createData("roles", role, token);

  const roleBodyId = roleResponce.data.id;
  console.log("role body id is ", roleBodyId);
};

export const baseFixture = base.extend({
  crm: async ({ page }, use) => {
    const crm = new AppCRM(page);
    await use(crm);
  }
});

export const testik = base.extend({
  test: [async ({  }, use, workerInfo) => {
    const apiContext = await request.newContext();
    const login = new Login(apiContext, {
      email: process.env.ADMIN_NAME,
      password: process.env.ADMIN_PASSWORD,
    });
    const token = await login.getToken();
    await createClientAndRole(token);
    console.log( "workerInfi is", workerInfo)
    await use(testik);
  },{ scope: 'worker' }]
});
