import express, { Response, Request } from "express";
import {
  getUserFromToken,
  signInUsingOTP,
  verifyOTP,
} from "../controllers/authControllers";

const router = express.Router();

router.post("/sign-in-otp", signInUsingOTP);
router.post("/verify-otp", verifyOTP);
router.post("/get-user", getUserFromToken);

export default router;
