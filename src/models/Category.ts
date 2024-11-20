import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Category extends Model {
  public categoryId!: number;
  public title!: string;
}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "categories",
    timestamps: true,
    paranoid: true,
  }
);

export default Category;
