/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  _id?: string;
  password: string;
  role: keyof typeof USER_ROLE;
  isDeleted?: boolean;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface IUserModel extends Model<TUser> {
  isUserExistsByEmail(id: string): Promise<TUser>;
  isPassWordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
