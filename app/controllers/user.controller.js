const user = require("../models/user.model.js");

exports.findAll = (req, res) => {
  user.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error fetching users."
      });
    } else {
      res.send(data);
   }
  });
};