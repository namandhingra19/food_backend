import { Sequelize } from "sequelize";
import { parseObject } from "../helpers/sqlHelper";
import {
  Cuisine,
  Order,
  OrderItem,
  User,
  UserAddress,
  UserProfile,
} from "../models";
import { ProfileType } from "../types/common";
import {
  CreateOrderPayload,
  ListOrderPayload,
  UpdateOrderPayload,
} from "../types/Order";
import { Request, Response } from "express";
import { sendEmailToSelf } from "../helpers/emailHelper";
import moment from "moment";
import { generateAddress } from "../helpers/helper";
class OrderController {
  public async create(req: Request, res: Response): Promise<any> {
    try {
      const payload: CreateOrderPayload[] = req.body;
      const user: any = req.user;
      const { userProfileId, name, phoneNo, userAddress } = user;
      console.log(user);
      console.log(userProfileId);
      const cuisineIds = payload.map((item) => item.cuisineId);
      const allCuisines = await Cuisine.findAll({
        where: { cuisineId: cuisineIds },
      });
      const orderTotal = payload.reduce((acc, curr) => {
        const cuisine = allCuisines.find(
          (item) => item.cuisineId === curr.cuisineId
        );
        return (
          acc +
          (cuisine
            ? (curr.quantity || 0) *
              (curr.priceType === "REGULAR"
                ? cuisine?.regularPrice
                : cuisine?.largePrice)
            : 0)
        );
      }, 0);
      const orderData = await Order.create({
        userProfileId,
        orderTotal,
      });
      const orderItemsPayload = payload.map((item) => ({
        ...item,
        orderId: orderData.orderId,
      }));
      const orderItemsData = await OrderItem.bulkCreate(orderItemsPayload);
      const createdOrderItemsWithCuisine = await OrderItem.findAll({
        where: {
          orderItemId: orderItemsData.map((item: any) => item.orderItemId), // Match the created IDs
        },
        include: [
          {
            model: Cuisine,
            as: "orderedCuisine",
            required: true,
            nested: true,
          },
        ],
      });
      console.log(userAddress);
      console.log(phoneNo);
      await sendEmailToSelf({
        orderId: orderData.orderId,
        customerName: name,
        items: createdOrderItemsWithCuisine.map((item: any) => ({
          quantity: item.quantity,
          name: item.orderedCuisine.title,
          price:
            item.priceType === "REGULAR"
              ? item.orderedCuisine.regularPrice
              : item.orderedCuisine.largePrice,
        })),
        orderDate: moment(orderData.createdAt).format("DD-MM-YYYY"),
        totalAmount: orderData.orderTotal,
        phoneNo: phoneNo,
        address: generateAddress(userAddress),
      });
      return res.status(200).json({
        data: { order: orderData, orderItems: orderItemsData },
        message: "Order created successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating Order",
        success: false,
      });
    }
  }
  public async list(req: Request, res: Response): Promise<any> {
    try {
      const user: any = req.user;
      const payload: ListOrderPayload = req.body;
      const { filter } = payload;
      let { userProfileType } = user;
      userProfileType =
        userProfileType === ProfileType.ADMIN ? undefined : userProfileType;
      console.log(parseObject(filter));
      const orders = await Order.findAll({
        where: {
          ...parseObject(filter),
        },
        attributes: [
          "orderId",
          "status",
          "orderTotal",
          ["createdAt", "orderDate"],
        ],
        include: [
          {
            model: UserProfile,
            as: "orderedUser",
            required: true,
            attributes: [
              "name",
              [
                Sequelize.literal('"orderedUser->userProfile"."phoneNo"'),
                "phoneNo",
              ],
            ],
            where: { ...parseObject({ userProfileType }) },
            include: [
              {
                model: UserAddress,
                as: "userAddress",
                required: false,
                attributes: [
                  "houseNo",
                  "street",
                  "locality",
                  "nearestLocation",
                  "district",
                  "state",
                  "pincode",
                ],
              },
              {
                model: User,
                as: "userProfile",
                required: false,
                attributes: [],
              },
            ],
          },
          {
            model: OrderItem,
            as: "orderedItems",
            required: true,
            attributes: [
              "quantity",
              [
                Sequelize.literal('"orderedItems->orderedCuisine"."title"'),
                "cuisineName",
              ],
              [
                Sequelize.literal(
                  '"orderedItems->orderedCuisine"."description"'
                ),
                "cuisineDescription",
              ],
              [
                Sequelize.literal(`
                  CASE
                    WHEN "orderedItems"."priceType" = 'REGULAR' 
                    THEN "orderedItems->orderedCuisine"."regularPrice"
                    ELSE "orderedItems->orderedCuisine"."largePrice"
                  END
                `),
                "price",
              ],
            ],
            include: [
              {
                model: Cuisine,
                as: "orderedCuisine",
                required: true,
                attributes: [],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({
        data: orders,
        message: "Orders fetched successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error fetching Orders",
        success: false,
      });
    }
  }
  public async update(req: Request, res: Response): Promise<any> {
    try {
      const { payload }: UpdateOrderPayload = req.body;
      const { orderId, status } = payload;
      await Order.update(
        {
          status,
        },
        {
          where: {
            orderId,
          },
        }
      );
      return res.status(200).json({
        message: "Order Updated Successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error updating Order",
        success: false,
      });
    }
  }
}

export default new OrderController();
