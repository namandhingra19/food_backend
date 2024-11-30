import express from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import cuisineController from "../controllers/cuisineController";
// import { list, update } from "../controllers/userController";

const router = express.Router();

router.post(
  "/create",
  uploadFileHelper.uploadToUploadsFolder.bind(uploadFileHelper),
  cuisineController.create
);
router.post("/list", cuisineController.list);
router.post("/update", cuisineController.update);

export default router;
