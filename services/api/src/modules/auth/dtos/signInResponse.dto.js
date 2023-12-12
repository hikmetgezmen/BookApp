import UserViewDto from "./userView.dto.js";
export class SignInResponseDto {
  constructor({ accessToken, refreshToken }, user) {
    this.token = {
      accessToken,
      refreshToken,
    };
    if (user) this.profile = new UserViewDto(user);
  }
}

export default SignInResponseDto;
