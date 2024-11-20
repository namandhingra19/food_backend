import express from "express";
import categoryController from "../controllers/categoryController";
import uploadFileHelper from "../helpers/uploadFileHelper";
// import { list, update } from "../controllers/userController";

const router = express.Router();

router.post(
  "/create",
  uploadFileHelper.uploadToUploadsFolder.bind(uploadFileHelper),
  categoryController.create
);
router.post("/list", categoryController.list);
router.post("/update", categoryController.update);

export default router;
