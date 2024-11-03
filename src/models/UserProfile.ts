import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserProfile extends Model {}

UserProfile.init(
  {
    userProfileId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "user_profiles",
  }
);

export default UserProfile;
