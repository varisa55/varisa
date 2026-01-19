const Product = require('../models/product.model');

exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  });

  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateById(
    req.params.id,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Product with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Product with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Product.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.id
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};
