class Login {
  constructor(apiContext, userCredentials) {
    this.context = apiContext;
    this.userCredentials = userCredentials
  }

  async getToken() {
    //const hello = await request.newContext();
    const responce = await this.context.post(
      "http://localhost:3000/v1/crm/sign-in",
      { data: this.userCredentials }
    );
    const responceBody = await responce.json();
    const token = await responceBody.access_token
    return token;
  }
 
  
}

module.exports = {Login}