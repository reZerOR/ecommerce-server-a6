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
export const UserController = {
  createUser,
};
