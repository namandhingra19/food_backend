import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Verification extends Model {
  public otp!: string;
  public phoneNo!: string;
  public userId!: number;
  public readonly createdAt!: Date;
}

Verification.init(
  {
    otp: {
      type: DataTypes.STRING(6),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [6, 6],
      },
    },
    phoneNo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10, 10],
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
  },
  {
    sequelize,
    modelName: "Verification",
    tableName: "verifications",
    timestamps: true,
    paranoid: true,
  }
);

export default Verification;
