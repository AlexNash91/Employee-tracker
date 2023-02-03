const connection = require('./db/connection')
const inquirer = require('inquirer')
require('console.table') 

if (connection) {
    console.log("Datebase is running")
    mainQuestion()
}

function mainQuestion() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestion',
            message: "What would you like to do?",
            choices : ['View Roles', 'View Employees', 'View Departments', 'Add Department','Add Role', 'Add Employee', 'Update Employee', 'Quit']
        }
    ]).then(answer => {
        switch (answer.mainQuestion) {
            case 'View Roles':
                viewRoles()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'View Departments':
                viewDeparments()
                break;
            case 'Add Department':
                addDepartment()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'Add Employee':
                addEmployee()
                break;
            case 'Update Employee':
                updateEmployee()
                break;
            default:
                connection.end()
        }
    })
}

//    connection.query("SELECT favorite_books.book_name AS name, book_prices.price AS price FROM favorite_books JOIN book_prices ON favorite_books.book_price = book_prices.id")

function viewRoles() {
    console.log('view all tables in a join')
    connection.query("SELECT role.title, role.salary, department.name FROM role JOIN department ON role.department_id = department.id", (err, data) => {
        if (err) throw err;
        console.log("")
        console.table(data)
    })
    mainQuestion()
}

function viewEmployees() {
    console.log('view only employees table');
    connection.query("SELECT * FROM employee", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}

function viewDeparments() {
    connection.query("SELECT * FROM department", (err, data) => {
        if (err) throw err;
        console.table(data)
    })
    mainQuestion()
}

// add funtionality for these
function addDepartment() {
    console.log('addDepartment')
    mainQuestion()
}


function addRole() {
    console.log('addRole')
    mainQuestion()
}


function addRole(){
    console.log('Add role to role table')
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the title for the new role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this new role?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the department id for this new role?',
        }
    ])
    .then(answer => {
        connect.query(`INSERT INTO role VALUES(id,'${answer.role}', ${answer.salary}, ${answer.id})`, (err,data) => {
        if(err) throw err;
        console.log('')
        viewRoles()

    })
})
}


function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the new Employee role:'
            },
        ])
        .then(answers => {
            const { firstName, lastName, newRole } = answers;

            let updateStatement = `UPDATE employee SET role_id = '${newRole}' WHERE first_name = '${firstName}' AND last_name = '${lastName}'`;

            connection.query(updateStatement, (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log(`Successfully updated ${firstName} ${lastName} to role ID# ${newRole}`);
                }
            });
            mainQuestion()
        });
}


