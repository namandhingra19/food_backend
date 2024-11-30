import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class OrderItem extends Model {
  public orderItemId!: number;
  public orderId!: number;
  public cuisineId!: number;
  public quantity!: number;
  public priceType!: string;
}

OrderItem.init(
  {
    orderItemId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "orderId",
      },
    },
    cuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cuisines",
        key: "cuisineId",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "order_items",
    timestamps: true,
    paranoid: true,
  }
);

export default OrderItem;
