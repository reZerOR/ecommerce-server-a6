import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../utils/catchAsync';
import { USER_ROLE } from '../modules/User/user.constant';
import { verifyToken } from '../utils/verifyJWT';
import { Status } from 'better-status-codes';
import { UserModel } from '../modules/User/user.model';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(Status.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;
    // checking if the user is exist
    const user = await UserModel.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(Status.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    if (user.isDeleted) {
      throw new AppError(Status.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(Status.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
