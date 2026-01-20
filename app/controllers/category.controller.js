const Category = require("../models/category.model.js");

// Get all categories
exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error fetching categories."
      });
    } else {
      res.send(data);
    }
  });
};

// Create a new category
exports.create = (req, res) => {
  if (!req.body.cat_name) {
    res.status(400).send({ message: "cat_name cannot be empty!" });
    return;
  }

  const newCategory = new Category({
    cat_name: req.body.cat_name,
    is_deleted: req.body.is_deleted || 0,
    created_date: req.body.created_date || new Date(),
    updated_date: req.body.updated_date || new Date()
  });

  Category.create(newCategory, (error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the category."
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// Update category
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Data to update cannot be empty!" });
    return;
  }

  Category.updateById(req.params.id, req.body, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({ 
          message: `Category with id ${req.params.id} not found.` 
        });
      } else {
        res.status(500).send({
          message: `Error updating category with id ${req.params.id}.`
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete category
exports.delete = (req, res) => {
  Category.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          message: `Category with id ${req.params.id} not found.`
        });
      } else {
        res.status(500).send({
          message: `Could not delete category with id ${req.params.id}.`
        });
      }
    } else {
      res.send({ message: "Category was deleted successfully!" });
    }
  });
};
