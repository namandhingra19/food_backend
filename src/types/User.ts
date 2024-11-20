import { UserAddress } from "../models";
import { Pagination, Timestamps } from "./common";
type ExcludeTimestampsAndIds<T> = Omit<
  T,
  | "userId"
  | "phoneNo"
  | "userAddressId"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
>;

export interface User extends Timestamps {
  userId: number;
  phoneNo: string;
  password: string;
  isProfileCreated: boolean;
}

export interface UserProfile extends Timestamps {
  userProfileId: number;
  userId: number;
  name: string;
  profileType: string;
  email: string;
}

export interface ListUserPayload extends Pagination {
  filter: Partial<{
    userId: number[];
    name: string[];
    email: string[];
    phoneNo: string[];
  }>;
}

export interface UpdateUserPayload {
  payload: ExcludeTimestampsAndIds<User> &
    ExcludeTimestampsAndIds<UserProfile> &
    ExcludeTimestampsAndIds<UserAddress>;
}
