const CreateOrderDTO = require("../dtos/create-order.dto");
const orderService = require("../services/order.service");
const { createOrderSchema } = require("../schemas/order.schema");

const orderController = {
  create: async (req, res) => {
    try {
      const userId = req.userId;

      const { error } = createOrderSchema.validate({
        ...req.body,
        userId,
      });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const orderRequest = new CreateOrderDTO({
        ...req.body,
        userId,
      });

      const order = await orderService.create(orderRequest);

      return res.status(200).json(order);
    } catch (error) {
      if (error.message.includes("não encontrado")) {
        return res.status(404).json({ error: error.message });
      }

      if (error.message.includes("não tem quantidade disponível")) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await orderService.findById(id);

      if (!order) {
        return res.status(404).json({ error: "Pedido não encontrado" });
      }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
