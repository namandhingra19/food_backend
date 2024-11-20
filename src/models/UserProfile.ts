import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserProfile extends Model {
  public userProfileId!: number;
  public userId!: number;
  public name!: string;
  public profileType!: string;
  public address!: string;
}

UserProfile.init(
  {
    userProfileId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user_profiles",
    timestamps: true,
    paranoid: true,
  }
);

export default UserProfile;
