use bamazon;

create table deparments (
department_id int(11) not null auto_increment,
department_name varchar(255) not null,
over_head_costs dec(10,2) not null,
PRIMARY KEY (department_id)
);

INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Sports & Outdoors', 100.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Home & Kitchen', 150.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Beauty & Personal Care', 175.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Health & Household', 120.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Tools & Home Improvement', 350.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Electronics', 20000.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Toys', 135.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Appliances', 12000.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Arts & Crafts', 90.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Books', 95.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Pet Supplies', 140.00);
INSERT INTO `departments` (`department_name`, `over_head_costs`) VALUES ('Office Supplies', 220.00);