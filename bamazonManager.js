require('dotenv').config();

const inquirer = require('inquirer');

const chalk = require('chalk');

const validator = require('validator');

const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


// -- CLI-TABLE for nice table format output for items listing -- //
const Table = require('cli-table');
const table = new Table({
    head:
        ["Item ID", "Item Name", "Price $", "In Stock"],
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
    }
});
// ************************************************************** //

// ----------------- console logging using chalk ---------------- //
const separator = (color, length) => { console.log(color("\n" + "-".repeat(length) + "\n")) }

const mainText = (text) => {
    let repeater = text.length + 20;
    separator(chalk.green, repeater)
    console.log(chalk.bgGreen.black(" ".repeat(10) + text.toUpperCase() + " ".repeat(10)))
    separator(chalk.green, repeater)
}
const errorText = (text) => {
    let repeater = text.length + 20;
    separator(chalk.red, repeater)
    console.log(chalk.bgRed(" ".repeat(10) + text.toUpperCase() + " ".repeat(10)))
    separator(chalk.red, repeater)
}
// *************************************************************** //

const productArray = [];

con.connect(function (err) {
    if (err) throw err;
    getProducts();
    startUp();
});

function getProducts() {
    con.query("SELECT * FROM products", (err, res, fields) => {
        if (err) throw err;
        res.forEach(element => {
            productArray.push(element.product_name)
        });
    })
    // console.log(productArray)
}

mainText(`Welcome Manager!`)

function startUp() {
    separator(chalk.cyan, 60)
    inquirer.prompt([{
        message: chalk.yellow("What would you like to do?"),
        name: "selection",
        type: "list",
        choices: ["View Products For Sale",
            "View Low Inventory",
            "Add To Inventory",
            "Add New Product",
            "Quit..."]
    }]).then(manager => {
        separator(chalk.yellow, 60)
        switch (manager.selection) {
            case 'View Products For Sale':
                listProducts();
                break;
            case 'View Low Inventory':
                lowInventory(5);
                break;
            case 'Add To Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'Quit...':
                return con.end();
            default:
                break;
        }
    })
}

function listProducts() {

    con.query("SELECT * FROM products", (err, result, fields) => {
        if (err) throw err;
        result.forEach(element => {
            table.push(
                [element.item_id, element.product_name, "$" + element.price, element.stock_quantity]
            )
        });
        console.log(chalk.green(table.toString()))
        // empty table to be able to push updated stock to it
        table.splice(0, table.length);

        startUp();
    })
}

function lowInventory(num) {
    let sql = `SELECT * FROM products GROUP BY item_id HAVING stock_quantity < ` + num;
    con.query(sql, (err, results, fields) => {
        if (err) throw err;
        results.forEach(element => {
            table.push(
                [element.item_id, element.product_name, "$" + element.price, element.stock_quantity]
            )
        });
        console.log(chalk.green(table.toString()))
        // empty table to be able to push updated stock to it
        table.splice(0, table.length);
        startUp();
    })
}

function addInventory() {
    con.query("SELECT * FROM products", (err, res) => {
        inquirer.prompt([{
            message: "Select which item you would like to add more of.",
            type: "list",
            name: "item",
            choices: () => {
                let choiceArray = [];
                res.forEach((element, i) => {
                    choiceArray.push(i + 1 + ": " + element.product_name)
                });
                return choiceArray;
            }
        }, {
            message: "What amount would you like to add to stock?",
            name: "quantity",
            validate: (value) => {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }]).then(answer => {
            // let ansSplice = answer.item.split("")
            // ansSplice.splice(0,3)
            // let newAnswer = ansSplice.join("");
            let chosenItem;
            res.forEach(element => {
                if (element.product_name === answer.item.split(": ").pop()) {
                    chosenItem = element;
                }
            });
            let currentStock = parseInt(chosenItem.stock_quantity);
            let newStock = parseInt(currentStock) + parseInt(answer.quantity);
            con.query("UPDATE products SET stock_quantity =" + newStock + " WHERE item_id = " + chosenItem.item_id, (err, res) => {
                if (err) throw err;
                mainText(`Increased ${chosenItem.product_name} stock by ${answer.quantity}. -- New stock quantity: ${newStock}`)
                startUp();
            })
        })
    })
}

function addProduct() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the new item you would like to submit?"
    }, {
        name: "department",
        type: "input",
        message: "What department does the new item go into?"
    }, {
        name: "price",
        type: "input",
        message: "What is the price of the item?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "initialStock",
        type: "input",
        message: "How much initial stock would you like to order in for this item?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    },
]).then(newProduct => {
        con.query(
            "INSERT INTO products SET ?",
            {
                product_name: newProduct.item,
                department_name: newProduct.department,
                price: newProduct.price,
                stock_quantity: newProduct.initialStock
            },
            function (err) {
                if (err) throw err;
                mainText(`Ordered ${newProduct.initialStock} of ${newProduct.item} into department ${newProduct.department} with a price of ${newProduct.price}`)
                startUp();
            }
        );
    })
}