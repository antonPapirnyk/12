//import { HomePage } from "../home/HomePage";
import { BasePage } from "../../pages/basePage";

class ResetPassword extends BasePage{
  constructor(page) {
    super(page);
    this.phoneNumber = page.locator("#phoneNumber");
    this.loginButton = page.locator("[type= 'submit']");
    this.smsInput = page.locator(".verification-input__character--selected");
    
  }

  async goTo() {
    await this.page.goto("https://beta-candidate.appollo.co.uk/reset-password");
  }

  async setPhoneNumber(phoneNumber) {
    await this.phoneNumber.fill(phoneNumber);
  }
 
  async clickOnForgotPassword() {
    await this.signUpBtn.click();
   //return new SignUpPage(this.page);
  }
}
export { ResetPassword };