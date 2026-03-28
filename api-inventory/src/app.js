const express = require("express");
const sequelize = require("./config/database");
const { Router } = require("express");
const inventoryRoutes = require("./routes/inventory.routes");

require("./models/Inventory");

const app = express();
app.use(express.json());

const router = Router();

router.use("/inventories", inventoryRoutes);

app.use(router);

sequelize
  .sync()
  .then(() => {
    console.log("🗄️ Database synced successfully!");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Error syncing database", err);
  });
