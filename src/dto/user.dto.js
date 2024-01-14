export class UserDTO {
  constructor(user) {
    this.id = user._id ?? user.id;
    this.username = user.username;
  }
}
