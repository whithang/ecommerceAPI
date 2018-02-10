var express = require('express');
var app = express();
var db = require('../db');
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('ecommerceAPI server started on ' + port);
});
