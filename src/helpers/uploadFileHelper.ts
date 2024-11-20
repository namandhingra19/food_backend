import AWS from "aws-sdk";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import multer, { Multer } from "multer";
import path from "path";
import { MediaLibraryPayload } from "../types/MediaLibrary";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
class UploadFile {
  private s3;
  private upload;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
    });
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads"));
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        const baseName = path.basename(file.originalname, ext);
        cb(null, `${baseName}-${timestamp}${ext}`);
      },
    });
    this.upload = multer({
      storage: storage,
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    }).array("files", 10); // Accept multiple files
  }

  // async uploadFileToS3(file: Express.Multer.File) {
  //   const fileStream = fs.createReadStream(file.path);
  //   const params = {
  //     Bucket: process.env.S3_BUCKET,
  //     Key: `uploads/${Date.now()}-${file.originalname}`,
  //     Body: fileStream,
  //   };

  //   try {
  //     const uploadResult = await this.s3.upload(params).promise();
  //     fs.unlinkSync(file.path); // Delete the file locally after upload
  //     return this.convertLinkToMediaLibrary(file, uploadResult.Location);
  //   } catch (err:any) {
  //     throw new Error(`S3 Upload Error: ${err.message}`);
  //   }
  // }
  convertLinkToMediaLibrary(
    file: Express.Multer.File,
    url: string
  ): MediaLibraryPayload {
    return {
      title: file.originalname,
      url,
      mediaType: "IMAGE",
    };
  }
  uploadToUploadsFolder(req: Request, res: Response, next: NextFunction) {
    this.upload(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: `File upload error: ${err.message}` });
      }
      next();
    });
  }

  generateUploadFolderLink(file: Express.Multer.File) {
    const url = `${BACKEND_URL}/uploads/${file.filename}`;
    return this.convertLinkToMediaLibrary(file, url);
  }
}

export default new UploadFile();
