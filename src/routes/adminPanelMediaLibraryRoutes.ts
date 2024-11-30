import express from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import adminPanelMediaLibrary from "../controllers/adminPanelMediaLIbrary";

const router = express.Router();

router.post(
  "/create",
  uploadFileHelper.uploadToUploadsFolder.bind(uploadFileHelper),
  adminPanelMediaLibrary.create
);
router.post("/list", adminPanelMediaLibrary.list);
router.post("/delete", adminPanelMediaLibrary.delete);

export default router;
