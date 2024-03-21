import {DriverDto} from "./driver.dto";

export class ManagerResponse {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  amountOfDrivers: number;
  drivers: DriverDto[];


  constructor(id: bigint, firstName: string, lastName: string, email: string, avatar: string,
              amountOfDrivers: number, drivers: DriverDto[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.amountOfDrivers = amountOfDrivers;
    this.drivers = drivers;
  }
}
