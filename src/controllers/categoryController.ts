import { Request, Response } from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import { Category, MediaLibrary, MediaLibraryCategory } from "../models";
import { CreateCategoryFormData, ListCategoryPayload } from "../types/Category";
import {
  MediaLibraryCategoryPayload,
  MediaLibraryPayload,
} from "../types/MediaLibrary";
import { parseObject } from "../helpers/sqlHelper";
import { Sequelize } from "sequelize";

class CategoryController {
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
      const payload: CreateCategoryFormData = req.body;
      const { title } = payload;
      const category = await Category.create({
        title,
      });

      const data = await MediaLibrary.bulkCreate(
        mediaLibraryPayload.map((item) => ({
          ...item,
          createdBy: userProfileId,
        })) as any
      );

      const mediaLibraryCategoryPayload: MediaLibraryCategoryPayload[] =
        data.map(({ mediaLibraryId }) => ({
          mediaLibraryId,
          categoryId: category.categoryId,
        }));
      await MediaLibraryCategory.bulkCreate(mediaLibraryCategoryPayload as any);
      return res.status(200).json({
        data: category,
        message: "Category created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating category",
        success: false,
      });
    }
  }

  public async list(req: Request, res: Response): Promise<any> {
    try {
      const payload: ListCategoryPayload = req.body;
      const { limit, offset, filter } = payload;
      const { rows, count } = await Category.findAndCountAll({
        attributes: [
          "categoryId",
          "title",
          [
            Sequelize.col("category.mediaLibrary_category.title"),
            "mediaLibraryTitle",
          ],
          [Sequelize.col("category.mediaLibrary_category.url"), "mediaUrl"],
        ],
        where: {
          ...parseObject(filter),
        },
        include: [
          {
            model: MediaLibraryCategory,
            as: "category",
            attributes: [],
            required: false,
            include: [
              {
                model: MediaLibrary,
                as: "mediaLibrary_category",
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
        message: "Categories Fetched Successfully",
        data: rows,
        total: count,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching Category" });
    }
  }
  public async update(req: Request, res: Response): Promise<any> {}
}

export default new CategoryController();
