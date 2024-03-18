export class DriverRequest {
  avatar: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;

  constructor(avatar: string, firstName: string, lastName: string, dateOfBirth: string, phoneNumber: string) {
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
  }
}
