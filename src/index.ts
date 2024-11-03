require("dotenv").config();
import express from "express";
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database";
const app = express();

const version = "v1";

app.use(express.json());

app.use(`/api/${version}/users`, userRoutes);

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
