const sql = require("./db.js");

const Category = function (category) {
    this.cat_name = category.cat_name;
    this.is_deleted = category.is_deleted;
    this.created_date = category.created_date;
    this.updated_date = category.updated_date;
};

Category.getAll = result => {

    sql.query("SHOW COLUMNS FROM category", (err, res) => {

        if (err) {
            console.log("Error: ", err);
            result(null, err);
            return;
        }

        console.log("Table Structure: ", res);
        result(null, res);
    });

};

module.exports = Category;