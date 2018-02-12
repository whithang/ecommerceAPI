var db = require('./../db/db');
var json2csv = require('json2csv');
var fs = require('fs');

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
    db.productsSoldByDay(req.query.start, req.query.end, function(err, result, fields) {
      if (err) {
        res.send(err);
      }
      if (req.query.csv === '1') {
        exportToCSV(fields, result, 'ByDay', res);
      } else {
        res.json(result);
      }
    });
  } else if (req.params.type === '1') {
    db.productsSoldByWeek(req.query.start, req.query.end, function(err, result, fields) {
      if (err) {
        res.send(err);
      }
      if (req.query.csv === '1') {
        exportToCSV(fields, result, 'ByWeek', res);
      } else {
        res.json(result);
      }
    });
  } else if (req.params.type === '2') {
    db.productsSoldByMonth(req.query.start, req.query.end, function(err, result, fields) {
      if (err) {
        res.send(err);
      }
      if (req.query.csv === '1') {
        exportToCSV(fields, result, 'ByMonth', res);
      } else {
        res.json(result);
      }
    });
  } else {
    throw new Error('incorrect request to productsSold');
  }

};

var exportToCSV = function(fields, result, format, res) {
  var headers = [];
  for (var i = 0; i < fields.length; i++) {
    headers.push(fields[i].name);
  }
  var csv = json2csv({data: result, fields: headers});
  fs.writeFile(Date.now() + format + '.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved**********');
    res.json(result);
  });

};
