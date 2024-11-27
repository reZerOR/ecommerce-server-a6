/* eslint-disable no-unused-vars */
import { Model } from "mongoose"

export interface TUser {
    _id?: string,
    password: string,
    role: 'admin'| 'user'
    isDeleted: boolean,
    name: string
    email: string
    phoneNumber: string
}

export interface IUserModel extends Model<TUser>{
    isUserExistsByEmail(id: string): Promise<TUser>;
    isPassWordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;
}