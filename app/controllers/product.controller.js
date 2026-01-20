const Product = require("../models/product.model.js");

// GET all products
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error fetching products."
      });
    } else {
      res.send(data);
    }
  });
};

// CREATE new product
exports.create = (req, res) => {
  const { product_name, price, category_id } = req.body;


  if (!product_name || !price || !category_id) {
    return res.status(400).send({
      message: "Product_name, price, and category_id cannot be empty!"
    });
  }

  const newProduct = new Product({ product_name, price, category_id });

  Product.create(newProduct, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the product."
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// UPDATE product by ID
exports.update = (req, res) => {
  const { product_name, price, category_id } = req.body;

  // ตรวจสอบค่าว่างเหมือน create
  if (!product_name || !price || !category_id) {
    return res.status(400).send({
      message: "Product_name, price, and category_id cannot be empty!"
    });
  }

  const updatedProduct = { product_name, price, category_id };

  Product.updateById(req.params.id, updatedProduct, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Product with id ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Error updating product with id ${req.params.id}`
        });
      }
    } else {
      res.send(data);
    }
  });
};

// DELETE product by ID
exports.delete = (req, res) => {
  Product.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Product with id ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete product with id ${req.params.id}`
        });
      }
    } else {
      res.send({ message: "Product was deleted successfully!" });
    }
  });
};
