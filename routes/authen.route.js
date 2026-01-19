const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({
      message: 'Access denied. No token provided'
    });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decode.userId; 
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Access denied. Invalid token'
    });
  };
};

module.exports = auth;