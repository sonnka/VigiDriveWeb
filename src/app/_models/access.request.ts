export class AccessRequest {
  driverEmail: string;
  accessDuration: string;

  constructor(driverEmail: string, accessDuration: string) {
    this.driverEmail = driverEmail;
    this.accessDuration = accessDuration;
  }
}
