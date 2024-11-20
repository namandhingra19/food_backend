import { Timestamps } from "./common";
type ExcludeTimestampsAndIds<T> = Omit<
  T,
  "mediaLibraryId" | "createdAt" | "updatedAt" | "deletedAt"
>;
export interface MediaLibrary extends Timestamps {
  mediaLibraryId: number;
  url: string;
  title: string;
  mediaType: string;
}

export interface MediaLibraryPayload
  extends ExcludeTimestampsAndIds<MediaLibrary> {}

export interface MediaLibraryCategoryPayload {
  mediaLibraryId: number;
  categoryId: number;
}
