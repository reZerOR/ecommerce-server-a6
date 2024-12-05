/* eslint-disable no-console */
import multer from "multer";
import path from "path";
import fs from "fs";
import { TImageFile } from "../interfaces/image.interface";
import AppError from "../errors/AppError";
import { Status } from "better-status-codes";
import { Express } from "express";
import { cloudinaryUpload } from "../config/cloudinery.config";
import { UploadApiResponse } from "cloudinary";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// constants/file.ts
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
];
const MAX_UPLOAD_SIZE = 3 * 1024 * 1024; // 3MB

// utils/fileUploader.ts
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  try {
    if (!file) {
      cb(null, true);
    }
    // Validate mimetype
    if (!ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
      cb(
        new AppError(
          Status.BAD_REQUEST,
          "Invalid file type. Only JPEG, PNG, JPG and GIF are allowed."
        )
      );
      return;
    }

    // Validate file size
    if (file.size > MAX_UPLOAD_SIZE) {
      cb(new Error("File size must be less than 3MB"));
      return;
    }

    // If all validations pass
    cb(null, true);
  } catch (error) {
    console.log(error);

    cb(new AppError(Status.BAD_REQUEST, "File validation failed"));
  }
};
// const storage = multer.memoryStorage()

const upload = multer({ storage: storage, fileFilter });

const uploadToCloudinary = async (
  file: TImageFile
): Promise<UploadApiResponse | undefined> => {
  return new Promise((resolve, reject) => {
    cloudinaryUpload.uploader.upload(
      file.path,
      (error: Error, result: UploadApiResponse) => {
        fs.unlinkSync(file.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
