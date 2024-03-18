export class AccessDto {
  id: bigint;
  driverEmail: string;
  managerEmail: string;
  startDateOfAccess: Date;
  endDateOfAccess: Date;
  accessDuration: string;
  isActive: boolean;
  isExpiring: boolean;

  constructor(id: bigint, driverEmail: string, managerEmail: string, startDateOfAccess: Date,
              endDateOfAccess: Date, accessDuration: string, isActive: boolean, isExpiring: boolean) {
    this.id = id;
    this.driverEmail = driverEmail;
    this.managerEmail = managerEmail;
    this.startDateOfAccess = startDateOfAccess;
    this.endDateOfAccess = endDateOfAccess;
    this.accessDuration = accessDuration;
    this.isActive = isActive;
    this.isExpiring = isExpiring;
  }
}
