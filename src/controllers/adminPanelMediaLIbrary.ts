import { Request, Response } from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import { MediaLibrary, MediaLibraryAdminPanel } from "../models";
import { ListCategoryPayload } from "../types/Category";
import {
  MediaLibraryAdminPanelPayload,
  MediaLibraryPayload,
} from "../types/MediaLibrary";
import { Sequelize } from "sequelize";

class AdminPanelMediaLibraryController {
  public async create(req: Request, res: Response): Promise<any> {
    const { userProfileId } = req?.user!;
    try {
      const mediaLibraryPayload: MediaLibraryPayload[] = [];
      if (req.files)
        for (const file of req.files) {
          const mediaLibraryInput =
            uploadFileHelper.generateUploadFolderLink(file);
          mediaLibraryPayload.push(mediaLibraryInput);
        }

      const data = await MediaLibrary.bulkCreate(
        mediaLibraryPayload.map((item) => ({
          ...item,
          createdBy: userProfileId,
        })) as any
      );

      const mediaLibraryCategoryPayload: MediaLibraryAdminPanelPayload[] =
        data.map(({ mediaLibraryId }) => ({
          mediaLibraryId,
        }));
      await MediaLibraryAdminPanel.bulkCreate(
        mediaLibraryCategoryPayload as any
      );
      return res.status(200).json({
        message: "New Photos added successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error adding new photos",
        success: false,
      });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const payload: ListCategoryPayload = req.body;
      const { limit, offset, filter } = payload;
      const { rows, count } = await MediaLibraryAdminPanel.findAndCountAll({
        limit,
        offset,
        where: filter,
        attributes: [
          [Sequelize.col("mediaLibraryAdminPanel.title"), "mediaLibraryTitle"],
          [Sequelize.col("mediaLibraryAdminPanel.url"), "mediaUrl"],
          [
            Sequelize.col("mediaLibraryAdminPanel.mediaLibraryId"),
            "mediaLibraryId",
          ],
        ],
        include: [
          {
            model: MediaLibrary,
            as: "mediaLibraryAdminPanel",
            attributes: [],
            required: true,
          },
        ],
        raw: true,
      });
      res.status(200).json({
        message: "Medias Fetched Successfully",
        data: rows,
        total: count,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching Category" });
    }
  }
  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const {
        mediaLibraryId,
      }: {
        mediaLibraryId: number;
      } = req.body;
      await MediaLibraryAdminPanel.destroy({
        where: { mediaLibraryId },
      });
      res.status(200).json({
        message: "Category deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error deleting category",
        success: false,
      });
    }
  }
}

export default new AdminPanelMediaLibraryController();
