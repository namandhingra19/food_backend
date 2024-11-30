import express from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import orderController from "../controllers/orderController";

const router = express.Router();

router.post("/create", orderController.create);
router.post("/list", orderController.list);
router.post("/update", orderController.update);

export default router;
