const sql = require("./db.js");

// Constructor
const user = function(user) {
  this.pro_name = user.pro_name;
  this.price = user.price;
  this.cat_id = user.cat_id;
};

// Fetch all data
user.getAll = result => {
  sql.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("user: ", res);
    result(null, res);
  });
};

module.exports = user;