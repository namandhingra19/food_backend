require("dotenv").config();
import express from "express";
import { Express } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import sequelize from "./config/database";
import cors from "cors";
import { validateAdmin, validateToken } from "./helpers/validateToken";
import { runMigrations, runSeeders } from "./helpers/runMigration";
import path from "path";

const PORT = process.env.PORT || 5000;

const app = express();

const version = "v1";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// app.use(validateToken);
// app.use(validateAdmin);
app.use(`/api/${version}/user`, userRoutes);
app.use(`/api/${version}/auth`, authRoutes);
app.use(`/api/${version}/category`, categoryRoutes);
sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
app.listen(5000, () => {
  console.log("Connected 5000 port");
});

export default app;
