class HomePage {
    constructor(page) {
      this.page = page;
      this.url = "/home";
    }
  
    async goTo() {
      await this.page.goto(this.url);
    }
  
  }
  
  export { HomePage }; 