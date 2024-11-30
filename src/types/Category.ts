import { Pagination } from "./common";

export interface Category {
  categoryId: number;
  title: string;
}
export interface CategoryDetails extends Category {
  url: string;
  imagetitle: string;
}
export interface CreateCategoryFormData {
  title: string;
  files: FileList;
}

export interface ListCategoryPayload extends Pagination {
  filter: Partial<Category>;
}
