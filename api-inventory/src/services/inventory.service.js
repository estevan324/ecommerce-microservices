const Inventory = require("../models/Inventory");
const SaveInventoryDTO = require("../dtos/save-inventory.dto");
const InventoryResponse = require("../dtos/inventory-response.dto");

const inventoryService = {
  /**
   * @returns {Promise<InventoryResponse>}
   */
  getByProductId: async (productId) => {
    const inventory = await Inventory.findOne({
      where: {
        productId,
      },
    });

    return new InventoryResponse(inventory);
  },
  /**
   * @param {SaveInventoryDTO} inventoryDTO
   * @returns {Promise<InventoryResponse>}
   */
  save: async (inventoryDTO) => {
    let inventory = await Inventory.findOne({
      where: {
        productId: inventoryDTO.productId,
      },
    });

    if (!inventory) {
      return await Inventory.create(inventoryDTO);
    }

    inventoryDTO.quantity = inventory.quantity - inventoryDTO.quantity;

    await Inventory.update(inventoryDTO, {
      where: {
        productId: inventoryDTO.productId,
      },
    });

    return new InventoryResponse({
      productId: inventoryDTO.productId,
      productName: inventoryDTO.productName,
      quantity: inventoryDTO.quantity,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    });
  },
};

module.exports = inventoryService;
