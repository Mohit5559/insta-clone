const con = require('../../../config/connectionMysql');

// create sql for the table.
const sql = `
    CREATE TABLE IF NOT EXISTS users( 
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        socialId VARCHAR(255) DEFAULT ' ',
        email VARCHAR(255) DEFAULT ' ', 
        mobile VARCHAR(12) DEFAULT ' ', 
        username VARCHAR(255) UNIQUE, 
        firstname VARCHAR(255) DEFAULT ' ', 
        lastname VARCHAR(255) DEFAULT ' ', 
        familyname VARCHAR(255) DEFAULT ' ', 
        givenname VARCHAR(255) DEFAULT ' ', 
        displayname VARCHAR(255) DEFAULT ' ', 
        password VARCHAR(255) DEFAULT ' ', 
        picture VARCHAR(255) DEFAULT 'grayImage.png', 
        provider VARCHAR(255) DEFAULT '', 
        verified_email VARCHAR(255) DEFAULT 'false', 
        gender enum('male', 'female', 'other') DEFAULT 'male', 
        deletedAt VARCHAR(1) DEFAULT '1', 
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`;

// create table.
con.query(sql, function(err, result){
    if(err) throw err;
});