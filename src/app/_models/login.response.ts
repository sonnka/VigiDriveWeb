export class LoginResponse {
  id: bigint;
  token: string;
  name: string;
  surname: string;
  avatar: string;

  constructor(id: bigint, token: string, name: string, surname: string, avatar: string) {
    this.id = id;
    this.token = token;
    this.name = name;
    this.surname = surname;
    this.avatar = avatar;
  }

  toString(): string {
    return 'id=' + this.id + '\ntoken=' + this.token + '\nname=' + this.name
      + '\nsurname=' + this.surname + '\navatar=' + this.avatar;
  }
}
