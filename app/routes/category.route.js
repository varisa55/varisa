module.exports = app => {
    const category = require("../controllers/category.controller.js");

    app.get("/category", category.findAll);
    app.post("/category", category.create);
    app.put("/category/:id", category.update);
    app.delete("/category/:id", category.delete);
};