const con = require('../../../config/connectionMysql');

const sql = `
    CREATE TABLE IF NOT EXISTS usercomments(
        id INT AUTO_INCREMENT NOT NULL,
        postId INT NULL,
        userId INT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (postId) REFERENCES userposts(id),
        thought VARCHAR(255) NULL,
        deletedAt VARCHAR(1) DEFAULT '1',
        createAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`;

// create table.
con.query(sql, function(err, result){
    if(err) throw err;
});