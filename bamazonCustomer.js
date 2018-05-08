let mysql = require('mysql');
let inquirer = require('inquirer');
require('console.table');

// initialize connection
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'tonyp',
    password: 'mySQLpassword',
    database: 'bamazon'
});

// test connection
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
    }
    console.log("Welcome to Bamazon!");
    loadProducts();
});

function loadProducts() {
    var query = 'SELECT * FROM products';
    connection.query(query, function(err, res) {
        // show the products
        console.table(res);

        // prompt customer for product
        promptCustomerForItem(res);
    });
}

function promptCustomerForItem(inventory) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What is the ID of the item you would like to purchase?',
    }]).then(function(val) {
        let choiceId = parseInt(val.choice);
        let product = checkInventory(choiceId, inventory);
        if (product) {
            promptCustomerForQuantity(product);
        } else {
            console.log('That item is not in our inventory');
            loadProducts();
        }
    });
}

function promptCustomerForQuantity(product) {
    inquirer.prompt([{
        type: 'input',
        name: 'quantity',
        message: 'How many ' + product.product_name + ' would you like to purchase?',
    }]).then(function(val) {
        let quantity = parseInt(val.quantity);
        if (isNaN(quantity)) {
            console.log("Not a valid number. Please try again.");
            loadProducts();
        } else if (quantity > product.stock_quantity) {
            console.log('Not enough of that item is in stock. Please try again.');
            loadProducts();
        } else {
            makePurchase(product, quantity);
        }
    })
}

function makePurchase(product, quantity) {
    var query = 'UPDATE products SET ? WHERE ?';
    connection.query(query,
        [{stock_quantity: product.stock_quantity - quantity}, 
        {id: product.id}],
        function(err, res) {
            if (err) throw err;
            var totalCost = parseInt(product.product_price) * quantity;
            console.log("Your order for " + quantity + " " + product.product_name + " has been placed! \nYour order cost $" + totalCost);
            keepShopping();
        }
    )
}

function checkInventory(choiceId, inventory) {
    for(var i=0; i < inventory.length; i++) {
        if (inventory[i].id === choiceId) {
            return inventory[i];
        }
    }
    return null;
}

function keepShopping(){
    inquirer.prompt([{
        type: 'confirm',
        name: 'checkout',
        message: 'Would you like to keep shopping?',
    }]).then(function(val) {
        let stillShopping = val.checkout;
        if (stillShopping) {
            loadProducts();
        } else {
            console.log('Thank you for shopping at Bamazon. Have a nice day.');
            connection.end();
        }
    });
};