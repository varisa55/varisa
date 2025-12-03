const sql = require("./db");

const Product = function (product) {
    this.pro_name = product.pro_name;
    this.pro_price = product.pro_price;
    this.cat_id = product.cat_id;
};

Product.getAll = result => {
};

Product.create = (newProduct, result) => {
};

Product.updateById = (id, updatedProduct, result) => {
};

Product.remove = (id, result) => {
};

module.exports = Product;
