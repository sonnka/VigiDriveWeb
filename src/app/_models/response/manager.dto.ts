export class ManagerDto {
  id: bigint;
  firstName: string;
  lastName: Date;
  email: string;
  avatar: string;
  amountOfDrivers: number;

  constructor(id: bigint, firstName: string, lastName: Date, email: string, avatar: string, amountOfDrivers: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.amountOfDrivers = amountOfDrivers;
  }
}
