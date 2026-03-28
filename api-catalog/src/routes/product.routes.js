const { Router } = require("express");
const productController = require("../controllers/product.controller");

const router = Router();

router.post("/", productController.save);

module.exports = router;
