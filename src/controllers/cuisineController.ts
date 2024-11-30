import { Request, Response } from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import { Cuisine, MediaLibrary, MediaLibraryCuisine } from "../models";
import { CreateCuisineFormData, ListCuisinePayload } from "../types/Cuisine";
import {
  MediaLibraryCuisinePayload,
  MediaLibraryPayload,
} from "../types/MediaLibrary";
import { parseObject } from "../helpers/sqlHelper";
import { Sequelize } from "sequelize";

class CuisineController {
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
      const payload: CreateCuisineFormData = req.body;
      const { files, ...rest } = payload;
      const cuisine = await Cuisine.create(rest);

      const data = await MediaLibrary.bulkCreate(
        mediaLibraryPayload.map((item) => ({
          ...item,
          createdBy: userProfileId,
        })) as any
      );

      const mediaLibraryCuisinePayload: MediaLibraryCuisinePayload[] = data.map(
        ({ mediaLibraryId }) => ({
          mediaLibraryId,
          cuisineId: cuisine.cuisineId,
        })
      );
      await MediaLibraryCuisine.bulkCreate(mediaLibraryCuisinePayload as any);
      return res.status(200).json({
        data: cuisine,
        message: "Cuisine created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating Cuisine",
        success: false,
      });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const payload: ListCuisinePayload = req.body;
      const { limit, offset, filter } = payload;
      const { rows, count } = await Cuisine.findAndCountAll({
        attributes: [
          "cuisineId",
          "title",
          "description",
          "cuisineType",
          "regularPrice",
          "largePrice",
          [
            Sequelize.col("cuisine.mediaLibrary_cuisine.title"),
            "mediaLibraryTitle",
          ],
          [Sequelize.col("cuisine.mediaLibrary_cuisine.url"), "mediaUrl"],
        ],
        where: {
          ...parseObject(filter),
        },
        include: [
          {
            model: MediaLibraryCuisine,
            as: "cuisine",
            attributes: [],
            required: false,
            include: [
              {
                model: MediaLibrary,
                as: "mediaLibrary_cuisine",
                attributes: [],
                required: true,
              },
            ],
          },
        ],
        raw: true,
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({
        message: "Cuisines Fetched Successfully",
        data: rows,
        total: count,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching Cuisine" });
    }
  }

  public async update(req: Request, res: Response): Promise<any> {}
}

export default new CuisineController();
