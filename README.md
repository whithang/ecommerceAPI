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

## Assumptions

1. Anything saved as a customer order is a sold product. There is no persisted state of a shopping cart holding products in an order which are not yet sold.
2. The format for calling the API function in task 3 is: http://localhost:3000/orders
3. In the API for task 4 above, the function for productsSold is found in the server/controllers.js file.
This API endpoint expects 4 parameters:
- `type` represents sorting by 'day', 'week', or 'month' identified by an index of 0, 1, or 2 respectively
- `start` represents the start date of the search on order creation dates
- `end` represents the end date of the search on order creation dates
- `csv` is an optional parameter which indicates whether or not the output should be returned in a csv file, a value of 1 needs to be passed to have the csv file created
The format for calling this API is http://localhost:3000/products/<type>?start=<YYYYMMDD>&end=<YYYYMMDD>&csv=1

4. start and end dates for the API should be in the format 'YYYYMMDD'
5. Assumption that start and end date are valid entries
6. The format for calling the API function in task 6 is: http://localhost:3000/orders/<customer_id> where customer_id is the unique id of the customer record


## Answers to Additional Questions

1. TODO - attach sketch
2. TODO
Would write code to ensure that user data entry was valid to avoid malicious input

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

## Saving to github
If you have any CRLF and LF errors, run `git config core.autocrlf false`
