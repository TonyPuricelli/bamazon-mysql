CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  product_price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("curtain", "bath", 10, 10), ("towels", "bath", 5, 20), ("blender", "kitchen", 50, 2), 
("toaster", "kitchen", 20, 5), ("cereal", "food", 2, 10), ("banana", "food", 1, 10), ("soap", "bath", 2, 6), 
("peanut butter", "food", 5, 5), ("saute pan", "kitchen", 50, 1), ("vacuum", "home", 100, 1);