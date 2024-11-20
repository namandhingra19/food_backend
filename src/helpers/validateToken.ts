import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserProfile } from "../models";
import { Sequelize } from "sequelize";
const JWT_SECRET = process.env.JWT_SECRET;

const ignoredPaths = ["/api/v1/auth/sign-in-otp", "/api/v1/auth/verify-otp"];
const adminPaths = [
  "/api/v1/category/create",
  "/api/v1/category/update",
  "/api/v1/cuisine/create",
  "/api/v1/cuisine/update",
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
    const user = await User.findOne({
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
      ],
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
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
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
