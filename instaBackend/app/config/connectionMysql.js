const dbConnection = require('mysql');
const config = require('../config/config')

// connect db
const con = dbConnection.createPool({
    connectionLimit:3,
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPwd,
    database: config.dbName,
    waitforwaitForConnections: true,
});

// const con = dbConnection.createConnection({    
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'instaclone'
// })

con.getConnection(function(err) {
    if (err){  console.log(err); }
    
    console.log("Database connected successfully!");
});

module.exports = con;