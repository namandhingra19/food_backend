export interface Category {
  categoryId: number;
  title: string;
}
export interface CategoryDetails extends Category {
  url: string;
  imagetitle: string;
}

export interface CreateCategoryPayload {
  title: string;
  files: File[];
}

export interface CreateCategoryFormData {
  title: string;
  files: FileList;
}
