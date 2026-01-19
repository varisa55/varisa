module.exports = app => {
  const products = require('../controllers/product.controller');
  const auth = require('./authen.route');

  app.post('/products', auth, products.create);

  app.get('/products', auth, products.findAll);

  app.put('/products/:id', auth, products.update);

  app.delete('/products/:id', auth, products.delete);
};