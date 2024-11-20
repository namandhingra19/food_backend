import Category from "./Category";
import Cuisine from "./Cuisine";
import MediaLibrary from "./MediaLibrary";
import MediaLibraryCategory from "./MediaLibraryCategory";
import MediaLibraryCuisine from "./MediaLibraryCuisine";
import User from "./User";
import UserAddress from "./UserAddress";
import UserProfile from "./UserProfile";
import Verification from "./Verification";

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
  as: "mediaLibraryCuisines",
});

MediaLibrary.hasMany(MediaLibraryCuisine, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibraryCuisines",
});

// cuisineId association with mediaLibraryCuisine

MediaLibraryCuisine.belongsTo(Cuisine, {
  foreignKey: "cuisineId",
  as: "cuisines",
});

Cuisine.hasMany(MediaLibraryCuisine, {
  foreignKey: "cuisineId",
  as: "cuisines",
});

// categoryId association with mediaLibraryCategory

MediaLibraryCategory.belongsTo(MediaLibrary, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibraryCategories",
});

MediaLibrary.hasMany(MediaLibraryCategory, {
  foreignKey: "mediaLibraryId",
  as: "mediaLibraryCategories",
});

// mediaLibraryId association with mediaLibraryCategory

MediaLibraryCategory.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "categories",
});

Category.hasMany(MediaLibraryCategory, {
  foreignKey: "categoryId",
  as: "categories",
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
};
