class UserViewDto {
  constructor(user) {
    this.id = user.id ?? user._id;
    this.role = user.role;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.fullName = `${this.name} ${this.surname}`;
    this.userName = user.userName;
  }
}

export default UserViewDto;
