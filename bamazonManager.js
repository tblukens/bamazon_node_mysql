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

function startUp() {
    mainText(`Welcome Manager!`)
    inquirer.prompt([{
        message: chalk.yellow("What would you like to do?"),
        name: "selection",
        type: "list",
        choices: [chalk.yellow(`View Products For Sale`),
        chalk.yellow(`View Low Inventory`),
        chalk.yellow(`Add To Inventory`),
        chalk.yellow(`Add New Product`),]
    }]).then
}