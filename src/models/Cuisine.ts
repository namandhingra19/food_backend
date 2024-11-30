import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Cuisine extends Model {
  public cuisineId!: number;
  public categoryId!: number;
  public title!: string;
  public description!: string;
  public cuisineType!: string;
  public regularPrice!: number;
  public largePrice!: number;
}

Cuisine.init(
  {
    cuisineId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cuisineType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regularPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    largePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "cuisines",
    timestamps: true,
    paranoid: true,
  }
);

export default Cuisine;
