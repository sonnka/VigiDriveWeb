import {LicenseResponse} from "./license.response";
import {ManagerDto} from "./manager.dto";

export class DriverResponse {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfBirth: Date;
  phoneNumber: string;
  destination: string;
  currentLocation: string;
  emergencyContact: string;
  manager: ManagerDto;
  license: LicenseResponse;

  constructor(id: bigint, firstName: string, lastName: string, email: string, avatar: string,
              dateOfBirth: Date, phoneNumber: string, destination: string, currentLocation: string,
              emergencyContact: string, manager: ManagerDto, license: LicenseResponse) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
    this.destination = destination;
    this.currentLocation = currentLocation;
    this.emergencyContact = emergencyContact;
    this.manager = manager;
    this.license = license;
  }
}
