import userRepository from "../repositories/user.repository.js";
import jwtService from "../../../services/jwt.service.js";
import SignInResponseDto from "../dtos/signInResponse.dto.js";
import { ApiError } from "../../../common/apiError.js";
import HttpStatusCodes from "http-status-codes";
class AuthService {
  async signIn({ email, password }) {
    const found = await userRepository.getByEmailAndPassword(email, password);
    if (!found)
      throw new ApiError(
        "Not found user",
        HttpStatusCodes.NOT_FOUND,
        "authservice->signin"
      );
    const token = jwtService.createToken(found);
    return new SignInResponseDto(token, found);
  }
  async getUserByEmail(email) {
    const found = await userRepository.getByEmail(email);
    if (!found)
      throw new ApiError(
        "Not found user",
        HttpStatusCodes.NOT_FOUND,
        "authservice->refreshAccessToken"
      );
    return found;
  }
  async refreshAccessToken(refreshToken) {
    const { token, user } = await jwtService.refreshAccessToken(
      refreshToken,
      this.getUserByEmail
    );
    return new SignInResponseDto(token, user);
  }
}

const instance = new AuthService();

export default instance;

export { AuthService };
