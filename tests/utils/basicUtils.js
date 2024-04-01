class Login {
  constructor(apiContext, userCredentials) {
    this.context = apiContext;
    this.userCredentials = userCredentials
  }

  async getToken() {
    //const hello = await request.newContext();
    const responce = await this.context.post(
      "https://beta-api.appollo.co.uk/v1/auth/sign-in",
      { data: this.userCredentials }
    );
    const responceBody = await responce.json();
    const token = responceBody.access_token
    return token;
  }
  
}


module.exports = {Login}