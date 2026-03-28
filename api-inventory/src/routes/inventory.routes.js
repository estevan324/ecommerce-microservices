const { Router } = require("express");
const inventoryController = require("../controllers/inventory.controller");

const router = Router();

router.get("/:productId", inventoryController.getByProductId);
router.put("/", inventoryController.save);

module.exports = router;
