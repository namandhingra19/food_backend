import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import moment from "moment";
import { sendOtpToPhone } from "../helpers/sendOtpToPhone";
import { User, UserAddress, UserProfile, Verification } from "../models";
import { Sequelize } from "sequelize";
import { ProfileType } from "../types/common";

export const signInUsingOTP = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;
    let user: any = await User.findOne({
      attributes: [
        "userId",
        "phoneNo",
        [Sequelize.col("userProfile.profileType"), "profileType"],
      ],
      where: {
        phoneNo: payload.phoneNo,
      },
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          required: false,
          attributes: [],
        },
      ],
      raw: true,
    });

    if (!user) {
      user = await User.create({
        phoneNo: payload.phoneNo,
      });
      const userProfile = await UserProfile.create({
        userId: user.userId,
        profileType: "USER",
      });
      await UserAddress.create({
        userProfileId: userProfile.userProfileId,
      });
    }
    if (user.profileType && user.profileType === ProfileType.ADMIN) {
      const data = {
        userId: user.userId,
        phoneNo: user.phoneNo,
      };
      const token = jwt.sign(data, process.env.JWT_SECRET as string);
      return res.status(200).json({
        message: "OTP sent successfully",
        token: token,
      });
    }

    if (user) {
      await sendOtpToPhone(payload.phoneNo, user["userId"]);
    }
    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating user", success: false });
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const payload = req.body;
    const verification = await Verification.findOne({
      where: {
        phoneNo: payload.phoneNo,
        otp: payload.otp,
      },
    });
    if (!verification) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (moment().diff(verification.createdAt, "minutes") > 5) {
      return res.status(400).json({ message: "OTP expired" });
    }
    const user = await User.findOne({
      attributes: [
        "userId",
        "phoneNo",
        [Sequelize.col("userProfile.profileType"), "profileType"],
      ],
      where: {
        userId: verification.userId,
      },
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          required: false,
          attributes: [],
        },
      ],
      raw: true,
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const data = {
      userId: user.userId,
      phoneNo: user.phoneNo,
    };
    const token = jwt.sign(data, process.env.JWT_SECRET as string);
    return res.status(200).json({
      message: "OTP verified successfully",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const getUserFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const payload = req.body;
    const user = req.user;
    return res.status(200).json({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};
