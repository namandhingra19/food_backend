import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Order extends Model {
  public orderId!: number;
  public userProfileId!: number;
  public status!: string;
  public orderTotal!: number;
  public createdAt!: Date;
}

Order.init(
  {
    orderId: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "PENDING",
    },
    orderTotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "orders",
    timestamps: true,
    paranoid: true,
  }
);

export default Order;
