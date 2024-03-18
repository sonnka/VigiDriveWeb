export class AdminDto {
  id: bigint;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  dateOfApproving: Date;
  chiefAdmin: boolean;
  approved: boolean;

  constructor(id: bigint, firstName: string, lastName: string, email: string, avatar: string, dateOfApproving: Date,
              chiefAdmin: boolean, approved: boolean) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.avatar = avatar;
    this.dateOfApproving = dateOfApproving;
    this.chiefAdmin = chiefAdmin;
    this.approved = approved;
  }
}
