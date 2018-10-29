require('dotenv').config();

const inquirer = require('inquirer');

const chalk = require('chalk');
const colors = require('colors');

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
        ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"],
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
    welcomeSup();
    startUp();
});

welcomeSup = () => {
    separator(colors.america, 39)
    mainText(`Welcome Supervisor!`)
    separator(colors.america, 39)
}

function startUp() {
    inquirer.prompt([{
        message: "What would you like to do?",
        type: "list",
        name: "choice",
        choices: ['View Product Sales by Department', 'Create New Department']
    }]).then(sup => {
        switch (sup.choice) {
            case 'View Product Sales by Department':
                separator(colors.america, 92)
                viewSales();
                break;
            case 'Create New Department':
                separator(colors.america, 92)
                createDept();
                break;
            default:
                break;
        }
    })
}

function viewSales() {
    const sql = `SELECT departments.department_id, departments.department_name, departments.over_head_costs,  
IFNULL(SUM(products.product_sales),0) AS product_sales,
IFNULL(SUM(product_sales - departments.over_head_costs),SUM(0-departments.over_head_costs)) AS total_profit  
FROM departments LEFT JOIN products ON departments.department_name = products.department_name  
GROUP BY departments.department_name ORDER BY departments.department_id ASC`;

    con.query(sql, (err, res, fields) => {
        if (err) throw err;
        res.forEach(element => {
            table.push(
                [element.department_id, element.department_name, '$' + element.over_head_costs, '$' + element.product_sales, '$' + element.total_profit]
            )
        });
        console.log(chalk.green(table.toString()))
        // empty table to be able to push updated stock to it
        separator(colors.america, 92)
        table.splice(0, table.length);

        endSession();
    })
}

function createDept() {
    inquirer.prompt([{
        message: "What is the name of the new department?",
        name: "dept",
        type: "input"
    }, {
        message: "What are the Overhead costs of the department?",
        name: "costs",
        type: "input",
        validate: (value) => {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(ans => {
        const sql = `INSERT INTO departments (department_name, over_head_costs) VALUES ("${ans.dept}",${ans.costs})`
        con.query(sql, (err, res) => {
            if (err) throw err;
            mainText(`Department "${ans.dept}" created with overhead costs of $${ans.costs}.`)
            separator(colors.america, 92)
            endSession();
        })
    })
}


function endSession() {
    inquirer.prompt([{
        message: "Would you like to end the session?",
        type: "confirm",
        name: "choice"
    }]).then(sup => {
        if (sup.choice) {
            con.end();
        } else {
            startUp();
        }
    })
}