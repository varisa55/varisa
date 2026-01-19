const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


// Create new user (Register)
exports.create = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password can not be empty!"
    });
    return;
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    } else {
      res.status(201).send(data);
    }
  });
};

// Login user
exports.login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password can not be empty!"
    });
    return;
  }

  User.loginByEmailAndPassword(
    req.body.email,
    req.body.password,
    (err, user) => {
      if( hasError(res, err)) return;

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(accessToken, user.id);
      res.json({
        accessToken,
        refreshToken,
      });
    }
  );
};

// Generate Access Token (expires in 15 minutes)
const generateAccessToken = (userId) => {
  return jwt.sign(
    { 
      userId: userId, 
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
};

// Generate Refresh Token (expires in 7 days)
const generateRefreshToken = (accessToken ,userId) => {
  return jwt.sign(
    { 
      userId: userId, 
      accessToken: accessToken,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );
};

// Check if there's an error
const hasError = (res, error) => {
  if (error) {
    if (error.kind === "not_found") {
      res.status(404).send({
        message: "Invalid email or password"
      });
    } else {
      res.status(500).send({
        message: error.message || "Some error occurred"
      });
    }
    return true;
  }
  return false;
};

