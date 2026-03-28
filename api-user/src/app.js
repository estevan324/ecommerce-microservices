const express = require("express");
const sequelize = require("./config/database");
const { Router } = require("express");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");

require("./models/User");

const app = express();
app.use(express.json());

const router = Router();

router.use("/users", userRoutes);
router.use("/login", authRoutes);

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
