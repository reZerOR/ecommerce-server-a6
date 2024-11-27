import { model, Schema } from "mongoose";
import { IUserModel, TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, IUserModel>(
  {
    name: { type: String, required: true },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      required: true,
      default: USER_ROLE.USER,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true, select: 0 },
    phoneNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select("+password");
};
userSchema.statics.isPassWordMatched = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, IUserModel>("User", userSchema);
