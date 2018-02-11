var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'api_database'
});

connection.connect();

module.exports.customerProductsByCategory = function(callback) {
  connection.query(`select customer_id, customer_first_name, category_id, category_name,
  SUM(quantity) as number_purchased from orders LEFT JOIN customers on
  customers.id = orders.customer_id LEFT JOIN order_products on
  order_products.order_id = orders.id LEFT JOIN product_categories on
  product_categories.product_id = order_products.product_id LEFT JOIN categories on
  categories.id = product_categories.category_id
  GROUP BY category_id, category_name, customer_id, customer_first_name`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.customerOrders = function(id, callback) {
  connection.query(`select O.id as order_id, customer_first_name, status, O.created_at
  from (select customer_id, status, orders.id, created_at from orders LEFT JOIN status
  on status.id = status_id) O LEFT JOIN customers on O.customer_id = customers.id
  WHERE customer_id = ${id}`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.productsSoldByDay = function(start, end, callback) {
  connection.query(`select DATE_FORMAT(created_at, '%Y-%m-%d') as order_date, product_id, name,
  SUM(quantity) as quantity, COALESCE(sum(weight), 0) as total_weight,
  COALESCE(measurement, '') as measurement from order_products LEFT JOIN orders
  on order_id = orders.id LEFT JOIN products on product_id = products.id
  WHERE created_at >= ${start} and created_at <= ${end}
  GROUP BY order_date, product_id
  ORDER BY order_date, product_id`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results, fields);
    }
  });
};

/*
optional csv flag on the api? and export as csv format ?
*/

module.exports.productsSoldByWeek = function(start, end, callback) {
  connection.query(`select DATE_FORMAT(STR_TO_DATE(CONCAT(YEARWEEK(created_at,0), ' Sunday'),
  '%X%V %W'), '%Y-%m-%d') as week_start_date, product_id, name, SUM(quantity) as quantity,
  COALESCE(sum(weight), 0) as total_weight, COALESCE(measurement, '') as measurement
  from order_products LEFT JOIN orders on order_id = orders.id LEFT JOIN products
  on product_id = products.id
  WHERE created_at >= ${start} and created_at <= ${end}
  GROUP BY week_start_date, product_id
  ORDER BY week_start_date, product_id`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results, fields);
    }
  });
};

module.exports.productsSoldByMonth = function(start, end, callback) {
  connection.query(`select YEAR(created_at) as order_year, MONTHNAME(created_at) as
  order_month, product_id, name, SUM(quantity) as quantity,
  COALESCE(sum(weight), 0) as total_weight, COALESCE(measurement, '') as measurement
  from order_products LEFT JOIN orders on order_id = orders.id
  LEFT JOIN products on product_id = products.id
  WHERE created_at >= ${start} and created_at <= ${end}
  GROUP BY order_year, order_month, product_id
  ORDER BY order_year, order_month, product_id`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results, fields);
    }
  });
};
