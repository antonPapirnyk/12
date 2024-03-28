import { HomePage } from "../home/HomePage";
import { BasePage } from "../../basePage";
import {ResetPassword} from "./ResetPasswordPage"
import { SignUpPage } from "./SignUpPage";

class LoginPage extends BasePage{
  constructor(page) {
    super(page);
    this.url = "/sign-in";
    this.phoneNumber = page.locator("#phoneNumber");
    this.password = page.locator("#password");
    this.loginButton = page.locator("[type= 'submit']");
    this.smsInput = page.locator(".verification-input__character--selected");
    this.smsValidationTitle = page.locator('//h2[text()="Verification"]');
    this.signUpBtn = page.locator('//a [text()="Sign Up"]');
    this.appStoreBtn = page.locator(".app-store-btn");
    this.googlePlayBtn = page.locator('.google-play-btn')
    this.forgotPasswordBtn = page.locator('//a[@href ="/reset-password"]')
    this.eyeBtn = page.locator('//span[@role = "img"]')
    this.errorPhone = page.locator('//div//label[@title="Mobile Number"]/parent::div/parent::div//div[@role = "alert"]')
    this.errorPassword = page.locator('//div//label[@title="Password"]/parent::div/parent::div//div[@role = "alert"]')
  }

  async goTo() {
    await this.page.goto(this.url);
  }

  async setPhoneNumber(phoneNumber) {
    await this.phoneNumber.fill(phoneNumber);
  }
  async setPassword(password) {
    await this.password.fill(password);
  }
  async clickLoginBtn() {
    await this.loginButton.click();
  }

  async doLogin(phoneNumber, password) {
    await this.setPhoneNumber(phoneNumber);
    await this.setPassword(password);
    await this.clickLoginBtn();
    return new HomePage(this.page)
  }

  async fillSmsCode() {
    await this.smsInput.waitFor();
    for (let i = 0; i < 5; i++) {
      await this.smsInput.type("1");
    }
    await this.loginButton.click();
  }
  async clickOnSignUp() {
    await this.signUpBtn.click();
   return new SignUpPage(this.page);
  }
  async clickOnForgotPassword() {
    await this.forgotPasswordBtn.click();
    return new ResetPassword(this.page);
  }
}

export { LoginPage };
