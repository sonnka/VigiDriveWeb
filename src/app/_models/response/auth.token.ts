export class AuthToken {
  accessToken: string;
  tokenType: string;
  expiresIn: bigint;

  constructor(accessToken: string, tokenType: string, expiresIn: bigint) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.expiresIn = expiresIn;
  }
}
