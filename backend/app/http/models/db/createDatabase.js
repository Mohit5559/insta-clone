const con = require('../../../config/connectionMysql');

// create database.
con.query("CREATE DATABASE IF NOT EXISTS instaclone", function (err, result) {
    if (err) throw err;    
});
