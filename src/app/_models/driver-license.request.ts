export class DriverLicenseRequest {
  number: string;
  dateTo: string;

  constructor(number: string, dateTo: string) {
    this.number = number;
    this.dateTo = dateTo;
  }
}
