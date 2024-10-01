const dbConnection = require('mysql');

// connect db
const con = dbConnection.createPool({
    max_user_connections:30,
    connectionLimit : 100,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Database connected successfully on port " + process.env.DB_PORT);
});

module.exports = con;
