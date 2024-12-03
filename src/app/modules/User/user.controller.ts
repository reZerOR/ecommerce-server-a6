import { Status } from "better-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
  const user = await UserServices.createUser(req.body);
  sendResponse(res, {
    message: "User created successFully",
    data: user,
    statusCode: Status.OK,
    success: true,
  });
});
const getUserAll = catchAsync(async (req, res) => {
  const user = await UserServices.getUserAll();
  sendResponse(res, {
    message: "User retrived successFully",
    data: user,
    statusCode: Status.OK,
    success: true,
  });
});
const userSoftDelete = catchAsync(async (req, res) => {
  const user = await UserServices.userSoftDelete(req.params.id);
  sendResponse(res, {
    message: "User softly deleted successFully",
    data: user,
    statusCode: Status.OK,
    success: true,
  });
});
const userHardDelete = catchAsync(async (req, res) => {
  const user = await UserServices.userHardDelete(req.params.id);
  sendResponse(res, {
    message: "User deleted successFully",
    data: user,
    statusCode: Status.OK,
    success: true,
  });
});
export const UserController = {
  createUser,
  getUserAll,
  userHardDelete,
  userSoftDelete,
};
