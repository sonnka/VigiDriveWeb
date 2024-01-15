export class RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;

  constructor(firstName: string, lastName: string, email: string, password: string, avatar: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
  }
}
