const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const OrderResponseDTO = require("../dtos/order-response.dto");
const productService = require("./product.service");
const paymentClient = require("../clients/payment.client");
const inventoryClient = require("../clients/inventory.client");
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

    try {
      const paymentResult = await paymentClient.pay({
        orderId: order.id,
        amount: totalAmount,
        paymentMethod: orderDTO.paymentMethod,
        description: `Pagamento de pedido ${order.id}`,
      });

      let finalPaymentStatus = PAYMENT_STATUS.REJECTED;

      if (paymentResult.status === PAYMENT_STATUS.APPROVED) {
        finalPaymentStatus = PAYMENT_STATUS.APPROVED;

        try {
          for (const item of items) {
            await inventoryClient.decrementStock(
              item.productId,
              item.quantity,
              item.productName
            );
          }
        } catch (inventoryError) {
          throw new Error(`Erro ao atualizar estoque: ${inventoryError.message}`);
        }
      } else {
        throw new Error(`Pagamento rejeitado: ${paymentResult.reason || "Motivo desconhecido"}`);
      }

      order.paymentStatus = finalPaymentStatus;
      await order.save();
    } catch (paymentError) {
      order.paymentStatus = PAYMENT_STATUS.REJECTED;
      await order.save();
      throw paymentError;
    }

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
};

module.exports = orderService;
