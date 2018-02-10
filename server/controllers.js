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
  //0 = by day, 1 = by week, 2 = by month
  if (req.params.type === 0) {
    db.productsSoldByDay(req.params.start, req.params.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  } else if (req.params.type === 1) {
    db.productsSoldByWeek(req.params.start, req.params.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  } else {
    db.productsSoldByMonth(req.params.start, req.params.end, function(err, result) {
      if (err) {
        res.send(err);
      }
      res.json(result);
    });
  }
};
