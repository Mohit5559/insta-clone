const con = require('../../../config/connectionMysql');

const sql = `
    CREATE TABLE IF NOT EXISTS userFollows(
        id INT AUTO_INCREMENT NOT NULL,
        PRIMARY KEY (id),
        userId INT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        followedId INT NULL,
        FOREIGN KEY (followedId) REFERENCES users(id),
        follow INT(1) DEFAULT 0,
        deletedAt VARCHAR(1) DEFAULT '1',
        createAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

// create table.
con.query(sql, function(err, result){
    if(err) throw err;
});