const express = require("express");
const sequelize = require("./config/database");
const { Router } = require("express");
const productRoutes = require("./routes/product.routes");

require("./models/Product");

const app = express();
app.use(express.json());

const router = Router();

router.use("/products", productRoutes);

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
