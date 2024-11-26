import { JwtPayload } from "jsonwebtoken";
import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      files?: UploadedFile | UploadedFile[];
    }
  }
}
