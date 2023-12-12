import { RoleInfo } from "../../../constants/roleInfo.js";

class UserCreateDto {
  constructor(data) {
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.userName = data.userName;
    this.password = data.password;
    this.role = RoleInfo.user;
  }
}

export default UserCreateDto;
