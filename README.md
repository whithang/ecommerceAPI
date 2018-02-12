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
7. Answer additional questions

## Requirements

- Node 9.x
- mySql 5.7.20

# Database Initialization

ensure `mysql` is running before executing the application. start the server with the below command:

`mysql.server start`

to create and populate the database with the test data, run this command from the command line:
`mysql -u <USER> < schema.sql`
OR
`mysql -u <USER> -p <PASSWORD> < schema.sql`
<USER> may be `root`

## Running the App

To run server: `npm run start`

## API Reference Guide

1. API functions are found in the server/controllers.js file
2. The format for calling the API function in task 3 is: http://localhost:3000/orders
3. API for task 4 above, the endpoint expects 4 parameters:
- `type` represents sorting by 'day', 'week', or 'month' identified by an index of 0, 1, or 2 respectively
- `start` represents the start date of the search on order creation dates
- `end` represents the end date of the search on order creation dates
- `csv` is an optional parameter which indicates whether or not the output should be returned in a csv file, a value of 1 needs to be passed to have the csv file created
The format for calling this API is http://localhost:3000/products/<type>?start=<YYYYMMDD>&end=<YYYYMMDD>&csv=1
4. start and end dates for the API should be in the format 'YYYYMMDD'
5. The format for calling the API function in task 6 is: http://localhost:3000/orders/<customer_id> where customer_id is the unique id of the customer record

## Assumptions

1. Anything saved as a customer order is a sold product. There is no persisted state of a shopping cart holding products in an order which are not yet sold.
2. Assumption that start and end date are valid entries
3. Billing is not included in the schema so there is an assumption that this is handled by a 3rd party for security purposes.

## Answers to Additional Questions

1. To support customer created lists of products for one-click ordering of bulk items, I would create a new table called `customer_product_lists`. The table would include the following fields:
- customer_id
- product_id
- order_quantity
- order_weight
Assumptions: The customer list is setup in a way to allow customers to do one-click ordering per product, not for the whole list of items at once. Bulk item refers to any type of product purchased either by weight or quantity. If sold by weight, products can be sold as a partial quantity.
Pros: This new setup fits well with the current database structure. `customer_product_lists` acts as a shopping cart and when the customer completes the one-click ordering, a new record is created in the `orders` table and the equivalent record in the `order_products` tables.
Cons: Tracking quantity and/or weight at the `customer_product_lists` table makes it necessary for the user to save multiple records of a single product if they ever want to order different quantities of that same product. So the list could start to appear to contain duplicates if the user is saving the same product multiple times with different quantities. However, without this, the customer would not be able to do one-click ordering as they would need to assign a quantity/weight for the order. Additionally, this setup does not keep a record of whether or not the one-click ordering is being used. There is no tracking of frequency of usage on the bulk items so there is no way to send customers a reminder about reordering.

2. Evaluating inventory distribution decisions for customers can be based on an algorithm which considers a mix of variables. As a business, Shipt should consider the impact of any inventory distribution decisions on their revenue.
- 1st variable: Location Proximity - The further a Shipt rep needs to go to deliver orders, the more the order costs in terms of time allocated to the order. So inventory distribution should consider the location proximity of the retail store to the customer. The closer customer would get priority.
- 2nd variable: Total Order Purchase Price - Assuming that Shipt makes more money when they deliver orders that have a higher value, they would want to ensure that customers don't cancel large orders. If the inventory the customer wants is not available, the customer might cancel their whole order. So it's best if a customer with a large order gets priority access to the limited inventory.
- 3rd variable: Overall Customer Experience - Shipt wants customers to have a good experience and become loyal, return customers. So Shipt can track and take into consideration variables that apply to the overall customer experience. This could include if the user is a first time customer in which case, they should get priority access to the inventory so their first impression of the company is positive. This could also include whether or not the customer has had items cancelled in the past due to inventory supply. In this case, the customer should get priority so that they don't have a repeat of the same issue.

## Next Steps

With more time, I would work on these items:
1. write code to ensure that user data entry was valid to avoid malicious input
2. write test cases
3. create code to import data to the database from a csv file
4. create the ability to save the csv reports to an FTP file server
5. create a cron job to run the csv reports on a regular schedule of daily/weekly/monthly
6. create security for access to the API with an API_KEY generator
7. add additional error catches

## Saving to github
If you have any CRLF and LF errors, run the below commands:
`git config core.autocrlf false`
`git config --global core.safecrlf false`
