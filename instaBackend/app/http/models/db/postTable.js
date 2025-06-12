const con = require('../../../config/connectionMysql');

const sql = `
    CREATE TABLE IF NOT EXISTS userposts(
        id INT AUTO_INCREMENT NOT NULL,
        userId INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        thumbnail VARCHAR(255) DEFAULT 'grayImage.png',
        video VARCHAR(255) NOT NULL,
        status VARCHAR(1) DEFAULT '0', 
        deletedAt VARCHAR(1) DEFAULT '1',
        createAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

// create table.
con.query(sql, function(err, result){
    if(err) throw err;
});