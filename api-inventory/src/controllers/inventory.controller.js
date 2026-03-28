const inventoryService = require("../services/inventory.service");
const SaveInventoryDTO = require("../dtos/save-inventory.dto");
const inventorySchema = require("../schemas/inventory.schema");

const inventoryController = {
  getByProductId: async (req, res) => {
    const { productId } = req.params;

    const inventory = await inventoryService.getByProductId(productId);

    if (!inventory) return res.sendStatus(204);

    return res.status(200).json(inventory);
  },
  save: async (req, res) => {
    const { error } = inventorySchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const request = new SaveInventoryDTO(req.body);

    const inventory = await inventoryService.save(request);

    return res.status(200).json(inventory);
  },
};

module.exports = inventoryController;
