//import { HomePage } from "./HomePage";
//import { BasePage } from "../../pages/basePage";

class CrmLoginPage {
  constructor(page) {
    this.page = page;
    this.url = "/sign-in";
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.loginButton = page.locator("[type= 'submit']");
  }

  async goTo() {
    await this.page.goto(this.url);
  }

  async setEmail(email) {
    await this.email.fill(email);
  }
  async setPassword(password) {
    await this.password.fill(password);
  }
  async clickLoginBtn() {
    await this.loginButton.click();
  }

  async doLogin(email, password) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLoginBtn();
  }
}

export { CrmLoginPage };
