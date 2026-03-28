const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const OrderResponseDTO = require("../dtos/order-response.dto");
const productService = require("./product.service");
const PAYMENT_STATUS = require("../enums/payment-status.enum");

const orderService = {
  /**
   * @param {CreateOrderDTO} orderDTO
   * @returns {Promise<OrderResponseDTO>}
   */
  create: async (orderDTO) => {
    const productIds = orderDTO.products.map((p) => p.id);
    const products = await productService.getProductsByIds(productIds);

    for (const product of orderDTO.products) {
      const isValid = await productService.validateStock(
        product.id,
        product.quantity
      );
      if (!isValid) {
        throw new Error(
          `Produto ${product.id} não tem quantidade disponível`
        );
      }
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const product of orderDTO.products) {
      const productData = products.find((p) => p.id === product.id);
      const itemTotal = productData.price * product.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        productId: product.id,
        productName: productData.name,
        quantity: product.quantity,
        unitPrice: productData.price,
        totalPrice: itemTotal,
      });
    }

    const order = await Order.create({
      userId: orderDTO.userId,
      paymentMethod: orderDTO.paymentMethod,
      paymentStatus: PAYMENT_STATUS.PENDING,
      totalAmount,
    });

    const items = await Promise.all(
      orderItems.map((item) =>
        OrderItem.create({
          ...item,
          orderId: order.id,
        })
      )
    );

    return new OrderResponseDTO(order, items);
  },

  /**
   * @param {string} orderId
   * @returns {Promise<OrderResponseDTO|null>}
   */
  findById: async (orderId) => {
    const order = await Order.findByPk(orderId, {
      include: {
        association: "items",
      },
    });

    if (!order) {
      return null;
    }

    return new OrderResponseDTO(order, order.items);
  },

  updatePaymentStatus: async (orderId, paymentStatus) => {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return null;
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    return order;
  },
};

module.exports = orderService;
