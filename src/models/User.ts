import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public userId!: number;
  public phoneNo!: string;
  isProfileCreated!: boolean;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isProfileCreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    timestamps: true,
    paranoid: true,
  }
);

export default User;
