import jwt from "jsonwebtoken";

class JwtService {
  accessTokenMaxAge = 1 * 60 * 60;
  refreshTokenMaxAge = 24 * 60 * 60;

  createToken(user) {
    const accessToken = this.createAccessToken(user);
    const refreshToken = this.createRefreshToken(user);
    return { accessToken, refreshToken };
  }
  createAccessToken = ({ id, _id, email, name, surname, role }) => {
    let identity = id;
    if (!identity) identity = _id;
    return jwt.sign(
      { id: id.toString(), email, name, surname, role },
      process.env.JWT_SECRET,
      {
        expiresIn: this.accessTokenMaxAge,
      }
    );
  };

  createRefreshToken = ({ id, _id, email }) => {
    if (!id) id = _id;
    return jwt.sign(
      { id: id.toString(), email },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: this.refreshTokenMaxAge,
      }
    );
  };

  verifyAccessToken = (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid access token");
    }
  };

  refreshAccessToken = async (refreshToken, getUserByEmailFunc) => {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await getUserByEmailFunc(decoded.email);
      const token = this.createToken(user);
      return { token, user };
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  };
}

const instance = new JwtService();

export default instance;
