const inventoryService = require("../services/inventory.service");
const SaveInventoryDTO = require("../dtos/save-inventory.dto");
const inventorySchema = require("../schemas/inventory.schema");

const inventoryController = {
  getByProductId: async (req, res) => {
    try {
      const { productId } = req.params;

      const inventory = await inventoryService.getByProductId(productId);

      if (!inventory) return res.sendStatus(204);

      return res.status(200).json(inventory);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  save: async (req, res) => {
    try {
      const { error } = inventorySchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const request = new SaveInventoryDTO(req.body);

      const result = await inventoryService.save(request);

      if (result.error) {
        return res.status(result.status).json({ error: result.error });
      }

      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = inventoryController;
