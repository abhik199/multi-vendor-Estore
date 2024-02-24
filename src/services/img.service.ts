import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";

// Define the type for files in the request
interface UploadedFiles {
  [fieldname: string]: Express.Multer.File[];
}

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination directory where uploaded files should be stored
    let uploadPath = "";
    if (file.fieldname === "product-image") {
      uploadPath = path.join(__dirname, "../../public/products");
    }
    if (file.fieldname === "user_profile") {
      uploadPath = path.join(__dirname, "../../public/user_profile");
    }
    if (file.fieldname === "vendor-profile") {
      uploadPath = path.join(__dirname, "../../public/vendor-profile");
    }
    console.log(`multer problem ${file.fieldname}`);

    fs.mkdir(uploadPath, { recursive: true }, (err: any) => {
      if (err) {
        console.error("Error creating folder:", err);
        return;
      }
      cb(null, uploadPath);
    });
    return;
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Define a file filter to accept only certain file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!file.originalname.match(/\.(png|jpg)$/)) {
    // Reject file if it's not PNG or JPG
    return cb(new Error("Only PNG and JPG files are allowed"));
  }
  // Accept the file
  cb(null, true);
};

// Initialize multer middleware
export const upload = multer({ storage, fileFilter });
