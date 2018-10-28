use bamazon;

create table products (
item_id int(11) not null auto_increment,
product_name varchar(255) not null,
department_name varchar(255) null,
price dec(10,2) not null,
stock_quantity int(10) not null default 0,
PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ('Basketball', 'Sports & Outdoors', 12.99, 5), ('Instant Pot (6 Qt)', 'Home & Kitchen', 84.79, 6), ('Aluminum Olive Oil Sprayer', 'Home & Kitchen', 9.99, 10), ('Ceramic Flat Iron Hair Straightener', 'Beauty & Personal Care', 36.99, 3), ('Honest Amish Beard Balm', 'Beauty & Personal Care', 12.23, 11), ('Body Back Massage Tool', 'Health & Household', 29.95, 4), ('Wool Dryer Balls', 'Health & Household',16.95,14), ('Tea Tree Oil Foot Soak', 'Beauty & Personal Care',13.16,12), ('Natural Mint Shoe Deodorizer','Health & Household',13.95,8), ('Good Grips Avocado Slicer','Home & Kitchen',9.99,10), ('LED Toilet Bowl Light', 'Tools & Home Improvement',14.95,5), ('Running Buddy Pouch', 'Sports & Outdoors', 22.99, 3), ('Athletic Compression Socks','Sports & Outdoors',15.95,6), ('Tea Tree Oil Shampoo', 'Beauty & Personal Care', 12.95,4), ('Bluetooth Headphones','Electronics',29.97,4), ('Mega Laptop Ultra XL', 'Electronics', 4599.99, 10);