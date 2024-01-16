export class LicenseResponse {
  id: bigint;
  number: string;
  dateTo: Date;

  constructor(id: bigint, number: string, dateTo: Date) {
    this.id = id;
    this.number = number;
    this.dateTo = dateTo;
  }
}
