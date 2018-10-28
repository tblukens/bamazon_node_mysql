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
        ["Item ID", "Item Name", "Price $"],
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
    startUp();
});

// first connection to get item product table with information
function startUp() {
    con.query("SELECT * FROM products", (err, result, fields) => {
        if (err) throw err;
        result.forEach(element => {
            table.push(
                [element.item_id, element.product_name, "$" + element.price]
            )
            productArray.push(element)
        });
        console.log(chalk.green(table.toString()))
        // empty table to be able to push updated stock to it
        table.splice(0, table.length);
        // -- Here we will then send the user to a function asking user for ID of product and quantity for purchase
        productSelect();
    });
}

// inquirer prompt user for item ID and quantity amount for purchase
function productSelect() {
    separator(chalk.yellow,60);
    inquirer.prompt([{
        message: chalk.yellow("Please enter the Item ID."),
        name: "itemID",
        type: "NumberPrompt"
    }, {
        message: chalk.yellow("Please enter quantity the item you would like to purchase."),
        name: "itemQuantity",
        type: "NumberPrompt"
    }]).then(product => {
        let idCheck = validator.isNumeric(product.itemID)
        let quantCheck = validator.isNumeric(product.itemQuantity)
        
        if (!idCheck || !quantCheck) {
            errorText(`Please enter numbers only for Item ID and Quantity.`)
            productSelect();
        } else if (idCheck && quantCheck) {
            inventoryCheck(product.itemID, product.itemQuantity)
        }
    })
}
// function to check inventory
function inventoryCheck(id, num) {
    con.query('SELECT * FROM products WHERE item_id=?', [id], (err, result) => {
        if (err) throw err;
        let stockMinus = parseFloat(result[0].stock_quantity) - parseFloat(num);
        let purchaseCost = parseFloat(num) * parseFloat(result[0].price);
        let itemName = result[0].product_name;
        if (stockMinus >= 0) {
            const sql = `UPDATE products SET stock_quantity = ${stockMinus} WHERE item_id = ?`
            con.query(sql, [id], (err, result) => {
                mainText(`You purchased ${num} of ${itemName}. Your total cost was $${purchaseCost.toFixed(2)}.`)
                newTransactionPrompt();
            })
        } else {
            errorText(`Insufficient quantity!`)
            newTransactionPrompt();
        }
    });
}

function newTransactionPrompt() {
    separator(chalk.yellow,60)
    inquirer.prompt([{
        message: chalk.yellow("Would you like to make a different purchase?"),
        name: "choice",
        type: "confirm"
    }]).then(user => {
        separator(chalk.yellow,60)
        if (user.choice){
            startUp();
        } else {
            con.end()
        }
    })
}

// -- finalize purchase
function completePurchase() {

}