import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MediaLibrary extends Model {
  public mediaLibraryId!: number;
  public mediaType!: string;
  public title!: string;
  public url!: string;
  public createdBy!: number;
  public updatedBy!: number;
  public deletedBy!: number;
}

MediaLibrary.init(
  {
    mediaLibraryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mediaType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deletedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "media_libraries",
    timestamps: true,
    paranoid: true,
  }
);

export default MediaLibrary;
