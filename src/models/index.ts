import Category from "./Category";
import Cuisine from "./Cuisine";
import MediaLibrary from "./MediaLibrary";
import MediaLibraryCategory from "./MediaLibraryCategory";
import MediaLibraryCuisine from "./MediaLibraryCuisine";
import Order from "./Order";
import OrderItem from "./OrderItems";
import User from "./User";
import UserAddress from "./UserAddress";
import UserProfile from "./UserProfile";
import Verification from "./Verification";
import MediaLibraryAdminPanel from "./MediaLibraryAdminPanel";

// userId association with userProfile
User.hasOne(UserProfile, { foreignKey: "userId", as: "userProfile" });
UserProfile.belongsTo(User, { foreignKey: "userId", as: "userProfile" });

// userId association with verification
User.hasOne(Verification, { foreignKey: "userId", as: "verification" });
Verification.belongsTo(User, {
  foreignKey: "userId",
  as: "verification",
});

// userProfileId association with userAddress
UserProfile.hasOne(UserAddress, {
  foreignKey: "userProfileId",
  as: "userAddress",
});
UserAddress.belongsTo(UserProfile, {
  foreignKey: "userProfileId",
  as: "userAddress",
});

//cuisineId association with cuisines
Cuisine.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "categories",
});
Category.hasMany(Cuisine, {
  foreignKey: "categoryId",
  as: "cuisines",
});

// mediaLibraryId association with mediaLibraryCuisine
MediaLibraryCuisine.belongsTo(MediaLibrary, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibrary_cuisine",
});

MediaLibrary.hasMany(MediaLibraryCuisine, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibrary_cuisine",
});

// cuisineId association with mediaLibraryCuisine

MediaLibraryCuisine.belongsTo(Cuisine, {
  foreignKey: "cuisineId",
  as: "cuisine",
});

Cuisine.hasMany(MediaLibraryCuisine, {
  foreignKey: "cuisineId",
  as: "cuisine",
});

// categoryId association with mediaLibraryCategory

MediaLibraryCategory.belongsTo(MediaLibrary, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibrary_category",
});

MediaLibrary.hasMany(MediaLibraryCategory, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibrary_category",
});

// mediaLibraryId association with mediaLibraryCategory

MediaLibraryCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

Category.hasMany(MediaLibraryCategory, {
  foreignKey: "categoryId",
  as: "category",
});

// orderId association with orderItems
OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "orderedItems",
});

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "orderedItems",
});

//cuisineId association with orderItems

OrderItem.belongsTo(Cuisine, {
  foreignKey: "cuisineId",
  as: "orderedCuisine",
});

Cuisine.hasMany(OrderItem, {
  foreignKey: "cuisineId",
  as: "orderedCuisine",
});

// userProfileId association with orders

Order.belongsTo(UserProfile, {
  foreignKey: "userProfileId",
  as: "orderedUser",
});

UserProfile.hasMany(Order, {
  foreignKey: "userProfileId",
  as: "orderedUser",
});

// mediaLibraryId association with mediaLibraryAdminPanel

MediaLibraryAdminPanel.belongsTo(MediaLibrary, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibraryAdminPanel",
});

MediaLibrary.hasMany(MediaLibraryAdminPanel, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibraryAdminPanel",
});

export {
  User,
  UserProfile,
  Verification,
  UserAddress,
  Category,
  Cuisine,
  MediaLibrary,
  MediaLibraryCategory,
  MediaLibraryCuisine,
  Order,
  OrderItem,
  MediaLibraryAdminPanel,
};
