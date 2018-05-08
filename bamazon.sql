CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES ("curtain", "bath", 10), ("towels", "bath", 20), ("blender", "kitchen", 2), ("toaster", "kitchen", 5), ("cereal", "food", 10), ("banana", "food", 10),("soap", "bath", 6), ("peanut butter", "food", 5), ("saute pan", "kitchen", 1), ("vacuum", "home", 1);