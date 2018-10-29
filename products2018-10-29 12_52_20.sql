use bamazon;

create table products (
item_id int(11) not null auto_increment,
product_name varchar(255) not null,
department_name varchar(255) null,
price dec(10,2) not null,
stock_quantity int(10) not null default 0,
product_sales dec(10,2) null default 0,
PRIMARY KEY (item_id)
);


INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Basketball', 'Sports & Outdoors', 12.99, 3, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Instant Pot (6 Qt)', 'Home & Kitchen', 84.79, 6, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Aluminum Olive Oil Sprayer', 'Home & Kitchen', 9.99, 10, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Ceramic Flat Iron Hair Straightener', 'Beauty & Personal Care', 36.99, 6, 36.99);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Honest Amish Beard Balm', 'Beauty & Personal Care', 12.23, 14, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Body Back Massage Tool', 'Health & Household', 29.95, 4, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Wool Dryer Balls', 'Health & Household', 16.95, 14, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Tea Tree Oil Foot Soak', 'Beauty & Personal Care', 13.16, 12, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Natural Mint Shoe Deodorizer', 'Health & Household', 13.95, 8, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Good Grips Avocado Slicer', 'Home & Kitchen', 9.99, 10, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('LED Toilet Bowl Light', 'Tools & Home Improvement', 14.95, 5, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Running Buddy Pouch', 'Sports & Outdoors', 22.99, 6, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Athletic Compression Socks', 'Sports & Outdoors', 15.95, 6, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Tea Tree Oil Shampoo', 'Beauty & Personal Care', 12.95, 8, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Bluetooth Headphones', 'Electronics', 29.97, 4, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Mega Laptop Ultra XL', 'Electronics', 4599.99, 8, 9199.98);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Furby', 'Toys', 29.99, 5, 0.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Deluxe Washer and Dryer 2-in-1', 'Appliances', 4200.00, 3, 4200.00);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('All Colors Colored Pencils', 'Arts & Crafts', 12.99, 7, 38.97);
INSERT INTO `products` (`product_name`, `department_name`, `price`, `stock_quantity`, `product_sales`)
VALUES ('Harry Potter Paperback Collection', 'Books', 49.99, 8, 99.98);
