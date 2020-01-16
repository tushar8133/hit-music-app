export class User {

  public email: string;
  public id: string;
  private _token: string;
  private _tokenExpirationDate: Date;
  
  constructor(){

  }

  save(email, id, token, tokenExpirationDate) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = new Date(tokenExpirationDate);
  }

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }

}
