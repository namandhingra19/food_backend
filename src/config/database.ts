import { Sequelize } from "sequelize";

const PG_HOST = process.env.PG_HOST || "localhost";
const PG_USERNAME = process.env.PG_USERNAME || "username";
const PG_PASSWORD = process.env.PG_PASSWORD || "password";
const PG_PORT = parseInt(process.env.PG_PORT!) || 5432;
const PG_DATABASE = process.env.PG_DATABASE || "postgres";

const sequelize = new Sequelize(PG_DATABASE, PG_USERNAME, PG_PASSWORD, {
  host: PG_HOST,
  port: PG_PORT,
  dialect: "postgres",
  logging: false,
  timezone: "+05:30",
});

export default sequelize;
