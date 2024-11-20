import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import { parseObject } from "../helpers/sqlHelper";
import { UserAddress, UserProfile } from "../models";
import User from "../models/User";
import { ListUserPayload, UpdateUserPayload } from "../types/User";
import { UserDetails } from "../types/common";

declare global {
  namespace Express {
    interface Request {
      user?: UserDetails;
      files?: Express.Multer.File[];
    }
  }
}

export const list = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload: ListUserPayload = req.body;
    const { limit, offset, filter } = payload;
    const { userId, phoneNo, ...rest } = filter;
    const { rows, count } = await User.findAndCountAll({
      attributes: [
        "userId",
        "phoneNo",
        [Sequelize.col("userProfile.userProfileId"), "userProfileId"],
        [Sequelize.col("userProfile.name"), "name"],
        [Sequelize.col("userProfile.email"), "email"],
        [Sequelize.col("userProfile.userAddress.houseNo"), "houseNo"],
        [Sequelize.col("userProfile.userAddress.street"), "street"],
        [Sequelize.col("userProfile.userAddress.locality"), "locality"],
        [
          Sequelize.col("userProfile.userAddress.nearestLocation"),
          "nearestLocation",
        ],
        [Sequelize.col("userProfile.userAddress.district"), "district"],
        [Sequelize.col("userProfile.userAddress.state"), "state"],
        [Sequelize.col("userProfile.userAddress.pincode"), "pincode"],
      ],
      where: { ...parseObject({ userId, phoneNo }) },
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          required: false,
          attributes: [],
          where: {
            ...parseObject({ ...rest }),
          },
          include: [
            {
              model: UserAddress,
              as: "userAddress",
              attributes: [],
              required: false,
            },
          ],
        },
      ],
      raw: true,
      offset,
      limit,
    });
    res.status(200).json({
      message: "Users Fetched Successfully",
      data: rows,
      total: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching User" });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { payload }: UpdateUserPayload = req.body;
    const user = req.user as UserDetails;
    const { email, name, ...rest } = payload;
    const userProfileId = rest.userProfileId ?? user?.userProfileId;
    const [] = await Promise.all([
      UserProfile.update(
        {
          ...parseObject({ email, name }),
        },
        {
          where: {
            userProfileId,
          },
        }
      ),
      UserAddress.update(
        {
          ...parseObject(rest),
        },
        {
          where: {
            userProfileId,
          },
        }
      ),
    ]);
    return res.status(200).json({
      message: "User Details Updated Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error Updating User", success: false });
  }
};
