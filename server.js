const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const Choices = require('inquirer/lib/objects/choices');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MyLDA2020",
    database: "employeeTr_db"
});

function start() {
    inquirer.prompt({
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View Departments, Roles and Employees', 'Add a Department, Role or Employee']
    }).then(function(answer) {
        console.log(answer)
        if (answer.menu === 'View Departments, Roles and Employees') {
            console.log("answer")
            return choiceOne();
        } else if (answer.menu === 'Add a Department, Role or Employee') {
            return choiceTwo();
        };
    });
}

function choiceOne() {
    inquirer.prompt({
        name: 'choicelist',
        type: 'list',
        message: 'Please select the option you would like to see',
        choices: ['Departments', 'Employee Roles', 'Employees', 'Return']
    }).then(function(answer) {
        console.log(answer.choicelist)
        if (answer.choicelist == 'Departments') {
            console.log('Departments')
            connection.query('SELECT * FROM department', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.choicelist === 'Employee Roles') {
            connection.query('SELECT * FROM role', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.choicelist === 'Employees') {
            console.log("employee")
            connection.query('SELECT * FROM employee', (err, results) => {
                if (err) throw err;
                console.table(results);
                choiceOne();
            })
        } else if (answer.choicelist === 'Return') {
            return start();
        }
    })
}

function choiceTwo() {
    inquirer.prompt({
        name: 'add',
        type: 'list',
        message: 'Please select the category you would like to add data to',
        choices: ['Departments', 'Role', 'Employee', 'Return']
    }).then(function(answer) {
        if (answer.add === 'Departments') {
            inquirer.prompt({
                name: 'dept',
                type: 'list',
                message: 'Choose a new Department',
                choices: ['PD', 'Management', 'Customer service', 'Marketing']
            }).then(function(answer) {
                let dept = answer.dept;
                connection.query('insert into department values (id, ?);', [dept], (err, results) => {
                    if (err) throw err;
                    if (!err) {
                        console.table(results);
                        connection.query('Select * FROM department', (err, results) => {
                            if (err) throw err;
                            console.table(results)
                            choiceTwo();
                        })
                    } else {
                        throw err
                    }
                })
            })
        } else if (answer.add === 'Role') {
            inquirer.prompt({
                name: 'role',
                type: 'list',
                message: 'Add a new Employee Role (title)',
                choices: ['Engineer', 'Customer service', 'Accountant', 'Manager', 'Marketer']
            }).then(function(answer) {
                let role = answer.role;
                connection.query('INSERT INTO role (title) VALUES (?)', [role], (err, results) => {
                    if (err) throw err;
                    inquirer.prompt({
                        name: 'salary',
                        type: 'number',
                        message: 'Add Salary'
                    }).then(function(answer) {
                        connection.query('UPDATE role SET salary = ? where title =?', [answer.salary, role], (err, results) => {
                            if (err) throw err;
                        })
                        inquirer.prompt({
                            name: 'department_ID',
                            type: 'number',
                            message: 'Select Department ID'
                        }).then(function(answer) {
                            connection.query('UPDATE role SET department_ID = ? where title =?', [answer.dept_ID, role], (err, results) => {
                                if (err) throw err
                                connection.query('SELECT * FROM role', (err, results) => {
                                    if (err) throw err;
                                    console.table(results)
                                    choiceTwo();
                                })
                            })
                        })
                    })
                }, )
            })
        } else if (answer.add === 'Employee') {
            inquirer.prompt([{
                    name: 'first',
                    type: 'input',
                    message: 'Please Enter New Employees first Name.'
                },
                {
                    name: 'last',
                    type: 'input',
                    message: 'Enter Last Name.'
                },
                {
                    name: 'role',
                    type: 'number',
                    message: 'Enter Role ID.'
                },
            ]).then(function(answer) {
                console.log(answer);
                connection.query('INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)', [answer.first, answer.last, answer.role], (err, results) => {
                    if (err) throw err;
                    connection.query('SELECT first_name , last_name FROM employee', (err, results) => {
                        if (err) throw err;
                        console.table(results)
                        choiceTwo();
                    })
                })
            })
        } else if (answer.add === 'Return') {
            return start();
        }
    })
}

connection.connect(function(err) {
    if (err) {
        return err
    }
    console.log(' the server is running ');
    start();
})
