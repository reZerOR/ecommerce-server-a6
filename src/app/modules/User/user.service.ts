import { Status } from "better-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: TUser) => {
  const isUserExistsByEmail = await UserModel.isUserExistsByEmail(payload.email)
  if(isUserExistsByEmail){
    throw new AppError(Status.BAD_REQUEST, "This email is already exists")
  }
  const user = await UserModel.create(payload);
  return user.email;
};

export const UserServices = {
  createUser,
};
