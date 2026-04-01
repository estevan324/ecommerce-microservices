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

    if (!inventory) {
      return null;
    }

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

    let newQuantity = inventory.quantity;

    if (inventoryDTO.type === "IN") {
      newQuantity += inventoryDTO.quantity;
    } else if (inventoryDTO.type === "OUT") {
      if (inventoryDTO.quantity > inventory.quantity) {
        return {
          error: "Quantidade insuficiente em estoque",
          status: 400,
        };
      }

      newQuantity -= inventoryDTO.quantity;
    }

    await Inventory.update(
      {
        ...inventoryDTO,
        quantity: newQuantity,
      },
      {
        where: {
          productId: inventoryDTO.productId,
        },
      },
    );

    return new InventoryResponse({
      productId: inventoryDTO.productId,
      productName: inventoryDTO.productName,
      quantity: newQuantity,
      createdAt: inventory.createdAt,
      updatedAt: inventory.updatedAt,
    });
  },
};

module.exports = inventoryService;
