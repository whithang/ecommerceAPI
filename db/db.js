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
  SUM(quantity) as number_purchased from orders left join customers on
  customers.id = orders.customer_id left join order_products on
  order_products.order_id = orders.id left join product_categories on
  product_categories.product_id = order_products.product_id left join categories on
  categories.id = product_categories.category_id group by category_id, category_name,
  customer_id, customer_first_name`, function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.customerOrders = function(id, callback) {
  connection.query(`select O.id as order_id, customer_first_name, status, O.created_at
  from (select customer_id, status, orders.id, created_at from orders left join status
  on status.id = status_id) O left join customers on O.customer_id = customers.id
  where customer_id = ${id}`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.productsSoldByDay = function(start, end, callback) {
  connection.query('xx', function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

/*
for day, use DAY(date) function to return 1 thru 31 day of month

? optional csv flag on the api? and export as csv format ?
*/

module.exports.productsSoldByWeek = function(start, end, callback) {
  connection.query(`select STR_TO_DATE(CONCAT(YEARWEEK(created_at,0), ' Sunday'), '%X%V %W')
  as week_start_date, product_id, name, SUM(quantity) as quantity, COALESCE(sum(weight), 0)
  as total_weight, COALESCE(measurement, '') as measurement from order_products left join
  orders on order_id = orders.id left join products on product_id = products.id
  WHERE created_at >= ${start} and created_at <= ${end}
  group by week_start_date, product_id
  order by week_start_date, product_id`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
/*
select date(created_at), str_to_date(concat(yearweek(created_at,0), ' Sunday'), '%X%V %W')
as week_name from order_products left join orders on order_id = orders.id;
*/

module.exports.productsSoldByMonth = function(start, end, callback) {
  connection.query(`select YEAR(created_at) as order_year, MONTHNAME(created_at) as
  order_month, product_id, name, SUM(quantity) as quantity,
  COALESCE(sum(weight), 0) as total_weight, COALESCE(measurement, '') as measurement
  from order_products left join orders on order_id = orders.id
  left join products on product_id = products.id
  WHERE created_at >= ${start} and created_at <= ${end}
  group by order_year, order_month, product_id
  order by order_year, order_month, product_id`,
  function(err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};
