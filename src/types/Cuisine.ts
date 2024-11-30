import { Pagination } from "./common";

export interface Cuisine {
  cuisineId: number;
  categoryId: number;
  title: string;
  description: string;
  cuisineType: string;
  regularPrice: number;
  largePrice: number;
}
export interface CuisinePayload extends Omit<Cuisine, "cuisineId"> {}

export interface CuisineDetails extends Cuisine {
  url: string;
  imagetitle: string;
}

export interface CreateCuisineFormData extends CuisinePayload {
  files: FileList;
}

export interface ListCuisinePayload extends Pagination {
  filter: Partial<Cuisine>;
}
