export class DriverDto {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;

  constructor(id: bigint, firstName: string, lastName: string, email: string, avatar: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
  }
}
