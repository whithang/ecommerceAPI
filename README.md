# Project Name

Ecommerce API for Shipt coding exercise

## Owner

- [Kelly Whiting](https://github.com/whithang)

## Tasks Accomplished

1. Build DB schema
2. SQL query created to return number of products purchased in a given category by a given customer
3. Function created to execute the above query
4. API endpoint returning products sold by quantity per day/week/month
5. Export to CSV capability for the above results
6. API endpoint returning orders for a customer

## Answers to Additional Questions

1. TODO - attach sketch
2. TODO

## Requirements

- Node 9.x
- mySql 5.7.20

# Database Initialization

ensure `mysql` is running before executing the application. start the server with the below command:

`mysql.server start`

to create and populate the database, run this command from the command line:
`mysql -u <USER> < schema.sql`
OR
`mysql -u <USER> -p <PASSWORD> < schema.sql`
<USER> may be `root`

## Running the App

To run server: `npm run start`
