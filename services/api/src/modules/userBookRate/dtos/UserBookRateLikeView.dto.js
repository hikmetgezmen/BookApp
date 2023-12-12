import { isObject } from "../../../helpers/index.js";
import UserBookRateViewDto from "./UserBookRateView.dto.js";
import UserViewDto from "../../auth/dtos/userView.dto.js";
class UserBookRateLikeViewDto {
  constructor(data) {
    this.id = data.id ?? data._id;
    this.type = Boolean(data.type);
    this.isLike = this.type;
    this.isDislike = !this.type;

    if (isObject(data.userBookRate)) {
      this.userBookRate = new UserBookRateViewDto(data.userBookRate);
      this.userBookRateId = this.userBookRate.id;
    } else this.userBookRateId = data.userBookRate;

    if (isObject(data.user)) {
      this.user = new UserViewDto(data.user);
      this.userId = this.user.id;
    } else this.userId = data.user;
  }
}

export default UserBookRateLikeViewDto;
