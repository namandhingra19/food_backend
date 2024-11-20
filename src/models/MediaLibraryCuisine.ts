import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MediaLibraryCuisine extends Model {
  public mediaLibraryId!: number;
  public cuisineId!: number;
}

MediaLibraryCuisine.init(
  {
    mediaLibraryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      references: {
        model: "media_libraries",
        key: "mediaLibraryId",
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
  },
  {
    sequelize,
    modelName: "media_libraries_cuisine",
    paranoid: true,
  }
);

export default MediaLibraryCuisine;
