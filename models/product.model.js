const conn = require('./db');

const Product = function(product) {
  this.name = product.name;
  this.price = product.price;
  this.description = product.description;
};

Product.create = (newProduct, result) => {
  conn.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

Product.findById = (productId, result) => {
  conn.query(`SELECT * FROM products WHERE id = ?`, productId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = result => {
  conn.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  conn.query(
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
    [product.name, product.price, product.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (id, result) => {
  conn.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  conn.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;