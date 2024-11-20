import { Timestamps } from "./common";

export interface UserAddress extends Timestamps {
  userAddressId: number;
  userProfileId: number;
  houseNo: string;
  street: string;
  locality: string;
  nearestLocation: string;
  district: string;
  state: string;
  pincode: string;
}
