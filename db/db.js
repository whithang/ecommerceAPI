var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_database'
});

connection.connect();

module.exports.customerProductsByCategory = function(callback) {
  connection.query('select customer_id, customer_first_name, category_id, category_name,
  sum(quantity) as number_purchased from orders left join customers on
  customers.id = orders.customer_id left join order_products on
  order_products.order_id = orders.id left join product_categories on
  product_categories.product_id = order_products.product_id left join categories on
  categories.id = product_categories.category_id group by category_id, category_name,
  customer_id, customer_first_name', function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.customerOrders = function(callback) {
  connection.query('xx', function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.productsSold = function(callback) {
  connection.query('xx', function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
