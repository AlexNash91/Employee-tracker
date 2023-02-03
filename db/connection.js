const mysql2 = require("mysql2")

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "nDH4(9Ti%m)J8ku8HF7!jR3^Jb93GVSGnu09VodYx&HW*kjpqU",
    database: "employees_db"
})

connection.connect(function(err) {
    if (err) throw err;
})

module.exports = connection