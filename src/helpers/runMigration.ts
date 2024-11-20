import path from "path";
import { Umzug, SequelizeStorage } from "umzug";
import sequelize from "../config/database";
import fs from "fs";
import { QueryInterface, Sequelize } from "sequelize";

export const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: path.join(__dirname, "./../migrations/*.js"), // Path to migrations folder
    },
    storage: new SequelizeStorage({ sequelize }), // Use Sequelize to track migrations
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  console.log("Running migrations...");
  await migrator.up();
  console.log("Migrations completed successfully.");
};

// export const runSeeders = async () => {
//   const seeder = new Umzug({
//     migrations: {
//       glob: path.join(__dirname, "../../seeders/*.js"), // Path to seeders folder
//     },
//     storage: new SequelizeStorage({ sequelize }), // Use Sequelize to track seeders
//     context: sequelize.getQueryInterface(),
//     logger: console,
//   });

//   console.log("Running seeders...");
//   await seeder.up();
//   console.log("Seeders completed successfully.");
// };

export const runSeeders = async () => {
  try {
    const seedersFolder = path.join(__dirname, "../../seeders");
    const seederFiles = fs.readdirSync(seedersFolder);

    for (const file of seederFiles) {
      if (file.endsWith(".js")) {
        const seeder = require(path.join(seedersFolder, file));

        // Run the `up` method of the seeder file
        await sequelize.transaction(async (t) => {
          await seeder.up(sequelize.getQueryInterface(), Sequelize);
        });

        console.log(`Seeder ${file} executed successfully!`);
      }
    }

    console.log("All seeders executed successfully!");
  } catch (error) {
    console.error("Error running seeders:", error);
  } finally {
    await sequelize.close(); // Close connection after all seeders are done
  }
};
