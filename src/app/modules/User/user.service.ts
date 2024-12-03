import { Status } from "better-status-codes";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: TUser) => {
  const isUserExistsByEmail = await UserModel.isUserExistsByEmail(
    payload.email
  );
  if (isUserExistsByEmail) {
    throw new AppError(Status.BAD_REQUEST, "This email is already exists");
  }
  const user = await UserModel.create(payload);
  return user.email;
};
const getUserAll = async () => {
  const result = await UserModel.find({ isDeleted: false }).select("-password");
  return result;
};
const userSoftDelete = async (id: string) => {
  const result = await UserModel.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};
const userHardDelete = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const UserServices = {
  createUser,
  getUserAll,
  userHardDelete,
  userSoftDelete,
};
