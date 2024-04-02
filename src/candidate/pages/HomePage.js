class HomePage {
    constructor(page) {
      this.page = page;
      this.userNameLabel = page.locator(".main-layout__user-name")
    }
  
   
  
    async goTo() {
      await this.page.goto("https://beta-candidate.appollo.co.uk/home");
    }
  
  }
  
  module.exports = { HomePage };
  