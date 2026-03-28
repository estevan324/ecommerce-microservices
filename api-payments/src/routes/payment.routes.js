const { Router } = require("express");
const paymentController = require("../controllers/payment.controller");

const router = Router();

router.get("/:orderId", paymentController.findByOrderId);
router.post("/", paymentController.pay);

module.exports = router;
