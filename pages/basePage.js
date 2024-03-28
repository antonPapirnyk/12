
class BasePage {
  constructor(page) {
    this.page = page;
  }
  //HAS ABSTRACT METHODS
  async reloadPage() {
    await this.page.reload();
  }

  verifyURL() {
    return this.page;
  }

  async verifyPageTitle(expected) {
    await (expect(page)).toHaveTitle(expected);
  }
  
  navigateToPage() {}
  goBack(){}
}
export {BasePage}