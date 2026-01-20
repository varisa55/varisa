module.exports = (app) => {
  const product = require("../controllers/product.controller.js");

  app.get("/products", product.findAll);
  app.post("/products", product.create);
  app.put("/products/:id", product.update);
  app.delete("/products/:id", product.delete);
};
