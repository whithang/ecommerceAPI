DROP DATABASE IF EXISTS api_database;

CREATE DATABASE api_database;

USE api_database;

CREATE TABLE customers (
  id int PRIMARY KEY AUTO_INCREMENT,
  customer_first_name VARCHAR(50),
  customer_last_name VARCHAR(50),
  address VARCHAR(100),
  city VARCHAR(20),
  state VARCHAR(2),
  zip VARCHAR(5),
  phone VARCHAR(10),
  email VARCHAR(50),
  password VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  );

CREATE TABLE status (
  id int PRIMARY KEY AUTO_INCREMENT,
  status VARCHAR(20)
);

CREATE TABLE orders (
  id int PRIMARY KEY AUTO_INCREMENT,
  customer_id int,
  status_id int,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (status_id) REFERENCES status(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

/*
select orders.id as order_id, customer_first_name + ' ' + customer_last_name as customer_name,
status, created_at from (select * from orders left join status on status.id = status_id)
left join customers where customer_id = customers.id ;
*/

CREATE TABLE products (
id int PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(15),
description VARCHAR(25),
sold_by_weight BOOLEAN,
weight DECIMAL(8,2),
measurement VARCHAR(10),
unit_price DECIMAL(5,2)
);

CREATE TABLE order_products (
id int PRIMARY KEY AUTO_INCREMENT,
order_id int,
product_id int,
quantity DECIMAL(5,2),
FOREIGN KEY (order_id) REFERENCES orders(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE categories (
id int PRIMARY KEY AUTO_INCREMENT,
category_name VARCHAR(15)
);

CREATE TABLE product_categories (
id int PRIMARY KEY AUTO_INCREMENT,
product_id int,
category_id int,
FOREIGN KEY (product_id) REFERENCES products(id),
FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO customers (id, customer_first_name, customer_last_name, address, city, state, zip, phone, email, password) VALUES
  (1, 'Billy', 'Bob', '123 Main St', 'San Francisco', 'CA', '94115', '4151234567', 'billy@bob.com', SHA2('billysPasswordcPjfn67sdv', 0)),
  (2, 'Sally', 'Sal', '590 Front Ave', 'Miami', 'FL', '33139', '3054128900', 'sally@sal.com', SHA2('sallysPassword8nJHBh665v', 0)),
  (3, 'David', 'Drummer', '9000 Big Bend', 'Reno', 'NV', '01229', '6169098765', 'david45@gmail.com', SHA2('davidsPasswordvByt76912s', 0));

INSERT INTO status (id, status) VALUES
  (1, 'Waiting for delivery'),
  (2, 'On its way'),
  (3, 'Delivered');

INSERT INTO orders (id, customer_id, status_id) VALUES
  (1, 1, 1),
  (2, 2, 2),
  (3, 3, 3);

INSERT INTO products (id, name, description, sold_by_weight, weight, measurement, unit_price) VALUES
  (1, 'Green Apples', 'From Oregon', true, 1, 'lb', 3.00),
  (2, 'Crackers', 'Sea Salt & Rosemary', false, null, null, 5.25),
  (3, 'Milk', '1% Milkfat', false, null, null, 3.10);

INSERT INTO order_products (id, order_id, product_id, quantity) VALUES
  (1, 1, 1, 5),
  (2, 1, 3, 1),
  (3, 2, 2, 2),
  (4, 3, 1, 1),
  (5, 3, 2, 1);

INSERT INTO categories (id, category_name) VALUES
  (1, 'Fruit'),
  (2, 'Dairy'),
  (3, 'Snacks'),
  (4, 'Organic');

INSERT INTO product_categories (id, product_id, category_id) VALUES
  (1, 1, 1),
  (2, 1, 4),
  (3, 2, 3),
  (4, 3, 2),
  (5, 3, 4);
