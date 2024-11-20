export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Pagination {
  limit?: number;
  offset?: number;
}

export interface UserDetails {
  userId: number;
  phoneNo: number;
  userProfileId: number;
  name: string;
  profileType: string;
  isProfileCreated: boolean;
}

export enum ProfileType {
  ADMIN = "ADMIN",
  USER = "USER",
}
