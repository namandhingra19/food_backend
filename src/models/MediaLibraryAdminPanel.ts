import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class MediaLibraryAdminPanel extends Model {
  public mediaLibraryId!: number;
}

MediaLibraryAdminPanel.init(
  {
    mediaLibraryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "media_libraries",
        key: "mediaLibraryId",
      },
    },
  },
  {
    sequelize,
    modelName: "media_libraries_admin_panel",
    paranoid: true,
  }
);

export default MediaLibraryAdminPanel;
