var db = require('./../db/db');

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
  if (req.params.type === '0') {
    db.productsSoldByDay(req.query.start, req.query.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  } else if (req.params.type === '1') {
    db.productsSoldByWeek(req.query.start, req.query.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  } else if (req.params.type === '2') {
    db.productsSoldByMonth(req.query.start, req.query.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  } else {
    throw new Error('incorrect request to productsSold');
  }

};
