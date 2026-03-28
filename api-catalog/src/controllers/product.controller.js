const CreateProductDTO = require("../dtos/create-product.dto");
const productService = require("../services/product.service");
const productSchema = require("../schemas/product.schema");

const productController = {
  save: async (req, res) => {
    try {
      const { error } = productSchema.validate(req.body);

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const request = new CreateProductDTO(req.body);

      const product = await productService.save(request);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const products = await productService.getAll();

      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  findById: async (req, res) => {
    try {
      const product = await productService.findById(req.params.id);
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = productController;
