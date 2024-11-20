import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MediaLibraryCategory extends Model {
  public mediaLibraryId!: number;
  public categoryId!: number;
}

MediaLibraryCategory.init(
  {
    mediaLibraryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "media_libraries",
        key: "mediaLibraryId",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories",
        key: "categoryId",
      },
    },
  },
  {
    sequelize,
    modelName: "media_libraries_category",
    paranoid: true,
  }
);

export default MediaLibraryCategory;
