import express from "express";
import { list, update } from "../controllers/userController";

const router = express.Router();

router.post("/list", list);
router.post("/update", update);

export default router;
