var express = require('express');
var app = express();
var db = require('./db/db');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require('./server/routes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
});

app.listen(port, function() {
  console.log('ecommerceAPI server started on ' + port);
});
