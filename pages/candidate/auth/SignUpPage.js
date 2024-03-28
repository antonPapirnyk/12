class SignUpPage {
    constructor(page) {
      this.page = page;
      this.url = "/sign-up";
      this.firstName = page.locator('//input [@id="firstName"]')
    }


    async setFirstName(name){
        await this.firstName.fill("helllo mazafa i am here to kill you")
    }
  
    async goTo() {
      await this.page.goto(this.url);
    }
  
  }
  
  module.exports = { SignUpPage };