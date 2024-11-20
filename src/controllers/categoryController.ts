import { Request, Response } from "express";
import uploadFileHelper from "../helpers/uploadFileHelper";
import { Category, MediaLibrary, MediaLibraryCategory } from "../models";
import { CreateCategoryPayload } from "../types/Category";
import {
  MediaLibraryCategoryPayload,
  MediaLibraryPayload,
} from "../types/MediaLibrary";

class CategoryController {
  public async list(req: Request, res: Response): Promise<any> {}
  public async create(req: Request, res: Response): Promise<any> {
    const { userProfileId } = req?.user!;
    try {
      const mediaLibraryPayload: MediaLibraryPayload[] = [];
      console.log("req.files--");
      console.log(req.files);
      if (req.files)
        for (const file of req.files) {
          const mediaLibraryInput =
            uploadFileHelper.generateUploadFolderLink(file);
          mediaLibraryPayload.push(mediaLibraryInput);
        }
      const payload: CreateCategoryPayload = req.body;
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
  public async update(req: Request, res: Response): Promise<any> {}
}

export default new CategoryController();
