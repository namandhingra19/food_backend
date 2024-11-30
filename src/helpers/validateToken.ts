import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserAddress, UserProfile } from "../models";
import { Sequelize } from "sequelize";
const JWT_SECRET = process.env.JWT_SECRET;

const ignoredPaths = [
  "/api/v1/auth/sign-in-otp",
  "/api/v1/auth/verify-otp",
  "/api/v1/category/list",
  "/api/v1/cuisine/list",
  "/api/v1/adminPanel/list",
];
const adminPaths = [
  "/api/v1/category/create",
  "/api/v1/category/update",
  "/api/v1/cuisine/create",
  "/api/v1/cuisine/update",
  "/api/v1/order/update",
];

export const validateToken = async (req: any, res: any, next: any) => {
  if (ignoredPaths.includes(req.path)) {
    next();
    return;
  }
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user: any = await User.findOne({
      where: {
        userId: (decoded as JwtPayload)?.userId,
      },
      attributes: [
        "userId",
        "phoneNo",
        "isProfileCreated",
        [Sequelize.col("userProfile.userProfileId"), "userProfileId"],
        [Sequelize.col("userProfile.name"), "name"],
        [Sequelize.col("userProfile.profileType"), "userProfileType"],
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
      include: [
        {
          model: UserProfile,
          as: "userProfile",
          required: true,
          attributes: [],
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
    });
    const {
      phoneNo,
      isProfileCreated,
      userProfileType,
      userProfileId,
      name,
      userId,
      ...rest
    } = user;
    let userDetails = {
      phoneNo,
      isProfileCreated,
      userProfileType,
      userProfileId,
      name,
      userId,
      userAddress: rest,
    };
    console.log(userDetails);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = userDetails;
    next();
    return;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const validateAdmin = async (req: any, res: any, next: any) => {
  if (adminPaths.includes(req.path)) {
    const user = req.user as any;
    if (user.userProfileType === "ADMIN") {
      next();
      return;
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
