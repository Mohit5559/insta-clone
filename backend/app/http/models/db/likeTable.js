const con = require('../../../config/connectionMysql');

const sql = `
    CREATE TABLE IF NOT EXISTS userlikes(
        id INT AUTO_INCREMENT NOT NULL,
        postId INT NULL,
        userId INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (postId) REFERENCES userposts(id),
        likes INT(1) DEFAULT 0,
        deletedAt VARCHAR(1) DEFAULT '1',
        createAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

// create table.
con.query(sql, function(err, result){
    if(err) throw err;
});