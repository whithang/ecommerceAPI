module.exports = function(app) {
  var reports = require('./controllers');

  app.route('/orders')
    .get(reports.customerProductsSoldByCategory);

  app.route('/orders/:id')
    .get(reports.customerOrders);

  app.route('/products')
    .get(reports.productsSold);
};
