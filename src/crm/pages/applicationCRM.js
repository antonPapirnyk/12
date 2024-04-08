import { HomePage } from "./homePage";
import { CrmLoginPage } from "./LoginPage.js";


export class AppCRM {
    constructor(page){
        this.page = page
        this.loginPage = new CrmLoginPage(this.page);
  this.homePage= new HomePage(this.page)
    }
  
}
