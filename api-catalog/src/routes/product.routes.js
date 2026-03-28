const { Router } = require("express");
const productController = require("../controllers/product.controller");

const router = Router();

router.get("/", productController.getAll);
router.get("/:id", productController.findById);
router.post("/", productController.save);

module.exports = router;
