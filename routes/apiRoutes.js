const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller.js");
const productcontroller = require("../controllers/product.controller.js");

// route users
router.get("/greet", userController.handleGreeting);
router.get("/users", userController.handleGetUsers);

// route products
router.get("/products",productcontroller.handleGetUsersr);

module.exports = router;