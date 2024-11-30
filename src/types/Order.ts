import { Pagination } from "./common";

export interface Order {
  orderId: number;
  userProfileId: number;
  status: string;
  orderTotal: number;
}

export interface OrderItem {
  orderItemId: number;
  orderId: number;
  cuisineId: number;
  quantity: number;
  priceType: string;
}

export interface CreateOrderPayload
  extends Omit<OrderItem, "orderItemId" | "orderId"> {}

export interface ListOrderPayload extends Pagination {
  filter: Partial<Order>;
}
export interface UpdateOrderPayload {
  payload: {
    status: string;
    orderId: number;
  };
}
