import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: TUser) => {
  const user = await UserModel.create(payload);
  return user;
};

export const UserServices = {
  createUser,
};
