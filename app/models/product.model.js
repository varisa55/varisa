const sql = require("./db.js");

// Constructor
const Product = function ( product ) {
  this.product_name = product.product_name;
  this.price = product.price;
  this.category_id = product.category_id;
};

// Fetch all data
Product.getAll = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    console.log("Product: ", res);
    result(null, res);
  });
};


Product.create = (newProduct, result) => {
    console.log(newProduct)
    sql.query("INSERT INTO products SET ?", newProduct, (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return
        }
        result(null, { id: response.insertId, ...newProduct });
    });
};



Product.updateById = (id, updatedProduct, result) => {
    sql.query( "UPDATE products SET ? WHERE id = ?",[updatedProduct, id], (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }
        
        result(null, { id: id, ...updatedProduct });
    }
    );
};



Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (error, response) => {
        if (error) {
            console.error(error);
            result(error, null);
            return;
        }

        if (response.affectedRows == 0) {

            result({ kind: "not_found" }, null);
            return;
        }
        
        result(null, response);
    });
};

module.exports = Product;