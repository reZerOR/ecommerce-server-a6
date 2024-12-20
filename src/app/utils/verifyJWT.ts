/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
// import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';
export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;
export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED',
} as const;

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    phoneNumber?: string;
    role: keyof typeof USER_ROLE;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};
