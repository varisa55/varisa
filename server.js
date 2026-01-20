<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Parse requests of content-type: application/json
app.use(bodyParser.json());

// Parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Node.js REST API with JWT" });
});

// Import routes
require('./routes/user.route')(app);
require('./routes/product.route')(app);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
=======
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application."});
});

require("./app/routes/category.route.js")(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
>>>>>>> 7a066581ad0bc03a22264d93ccca92d57f7c2cfd
});