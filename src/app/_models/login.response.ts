export class LoginResponse {
  id: bigint;
  token: string;
  name: string;
  surname: string;
  role: string;
  avatar: string;

  constructor(id: bigint, token: string, name: string, surname: string, role: string, avatar: string) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.surname = surname;
    this.role = role;
    this.avatar = avatar;
  }
}
