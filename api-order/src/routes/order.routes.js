const { Router } = require("express");
const orderController = require("../controllers/order.controller");

const router = Router();

router.post("/", orderController.create);
router.get("/:id", orderController.findById);

module.exports = router;
