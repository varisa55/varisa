module.exports = app => {
  const users = require('../controllers/user.controller');

  // Register new user
  app.post('/user', users.create);

  // Login user
  app.post('/user/login', users.login);
};