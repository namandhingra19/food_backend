import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class UserAddress extends Model {
  public userAddressid!: number;
  public userProfileId!: number;
  public houseNo!: string;
  public street!: string;
  public locality!: string;
  public nearestLocation!: string;
  public district!: string;
  public state!: string;
  public pincode!: string;
}

UserAddress.init(
  {
    userAddressId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user_profiles",
        key: "userProfileId",
      },
    },
    houseNo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nearestLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user_addresses",
    timestamps: true,
    paranoid: true,
  }
);

export default UserAddress;
