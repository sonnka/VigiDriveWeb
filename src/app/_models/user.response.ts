export class UserResponse {
  userId: bigint;
  fullName: string;
  avatar: string;

  constructor(userId: bigint, fullName: string, avatar: string) {
    this.userId = userId;
    this.fullName = fullName;
    this.avatar = avatar;
  }
}
