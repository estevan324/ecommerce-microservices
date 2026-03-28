const express = require("express");
const sequelize = require("./config/database");
const { Router } = require("express");
const paymentRoutes = require("./routes/payment.routes");

require("./models/Payment");

const app = express();
app.use(express.json());

const router = Router();

router.use("/payments", paymentRoutes);

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
