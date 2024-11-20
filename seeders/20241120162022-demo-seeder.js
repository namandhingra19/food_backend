"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        userId: 1,
        phoneNo: "1234567890",
        isProfileCreated: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("user_profiles", [
      {
        userProfileId: 1,
        userId: 1,
        profileType: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert("user_addresses", [
      {
        userAddressId: 1,
        userProfileId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_addresses", {
      userAddressId: 1,
    });

    await queryInterface.bulkDelete("user_profiles", {
      userProfileId: 1,
    });

    await queryInterface.bulkDelete("users", {
      userId: 1,
    });
  },
};
