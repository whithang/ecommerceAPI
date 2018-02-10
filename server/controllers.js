var db = require('../db');

exports.customerProductsSoldByCategory = function(req, res) {
  db.customerProductsByCategory(function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.customerOrders = function(req, res) {
  db.customerOrders(req.params.id, function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};

exports.productsSold = function(req, res) {
  db.productsSold(function(err, result) {
    if (err) {
      res.send(err);
    }
    res.json(result);
  });
};
// module.exports = function(app) {
//   var reports = require('../controllers/reports');
//
//   app.route('/orders')
//     .get(reports.customerProductsSoldByCategory);
//
//   app.route('/orders/:id')
//     .get(reports.customerOrders);
//
//   app.route('/products')
//     .get(reports.productsSold);
// };
