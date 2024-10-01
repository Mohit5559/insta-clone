const dbConnection = require('mysql');

// connect db
const con = dbConnection.createPool({
<<<<<<< HEAD
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
=======
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'instaclone',
    port: '10000'
>>>>>>> c8a62c7c55a923cc1d3fe62617262e27825aea24
});

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Database connected successfully on port " + process.env.DB_PORT);
});

module.exports = con;
