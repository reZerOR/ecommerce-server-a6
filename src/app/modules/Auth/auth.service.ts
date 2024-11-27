import { Status } from "better-status-codes";
import AppError from "../../errors/AppError";
import { UserModel } from "../User/user.model";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { USER_ROLE } from "../User/user.constant";
import config from "../../config";
import { createToken, verifyToken } from "../../utils/verifyJWT";

const registerUser = async (payload: TRegisterUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(Status.NOT_FOUND, "This user is already exists");
  }
  payload.role = USER_ROLE.USER;
  const newUser = await UserModel.create(payload);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    phoneNumber: newUser.phoneNumber,
    role: newUser.role,
  };
  const accesstoken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in!
  );
  return {
    accesstoken,
    refreshToken,
  };
};

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(Status.NOT_FOUND, "This user is not Found");
  }
  if (user.isDeleted) {
    throw new AppError(Status.FORBIDDEN, "This user is blocked");
  }
  if (!(await UserModel.isPassWordMatched(payload.password, user?.password))) {
    throw new AppError(Status.Forbidden, "Password do not match");
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };
  const accesstoken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in!
  );
  return {
    accesstoken,
    refreshToken,
  };
};
const refreshToken = async (token: string) => {
  const decoded = verifyToken(token, config.jwt_refresh_secret!) as {
    email: string;
    iat: number;
  };
  const { email } = decoded;
  const user = await UserModel.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(Status.NOT_FOUND, "This user is not found!");
  }
  if (user.isDeleted) {
    throw new AppError(Status.NOT_FOUND, "This user is blocked found!");
  }
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  return {
    accessToken,
  };
};
export const authController = {
  registerUser,
  loginUser,
  refreshToken,
};
