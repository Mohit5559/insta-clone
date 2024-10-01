const con = require('../../../config/connectionMysql');

class QueryClass{
    // select
    create(table, fields, data, callback) {
        let sql = `
        INSERT INTO ${table}${fields} VALUES(${data})
        `;

        // create table.          
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            err ? callback(err,null) : callback(null, result);
        });
    }

    // query
    findOne(table, fields, data, callback) {
        let sql = `
            SELECT * FROM ${table} WHERE ${fields} = ${data} AND deletedAt = 1
        `;
        
        // create table.          
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            err ? callback(err,null) : callback(null, result);
            return;
        });
        return;
    }

    // Absolute data find
    findAbsolute(table, whereClouse, callback) {
        let sql = `
            SELECT * FROM ${table} WHERE ${whereClouse}
        `;
        
        // create table.          
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            err ? callback(err,null) : callback(null, result);
            return;
        });
        return;
    }

    // update.
    findAndUpdate(table, whereClouse, data, callback) {
        // let sql = `
        //     SELECT id, email FROM ${table} WHERE ${whereClouse}
        // `;

        let sql = `
            SELECT id FROM ${table} WHERE ${whereClouse}
        `;
        
        // create table.
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            if (err){
                callback(err,null);
                result
            }else{
                //after execute query if error come so return error otherwise return data.
                let updateSql = `                
                    UPDATE ${table}
                    SET ${data}
                    WHERE id = ${result[0].id};
                `;

                con.query(updateSql, function (err, result) {
                    if (err){
                        callback(err,null);
                        result
                    }else{
                        callback(null, result);
                        return;
                    };
                });
            };
            return;
        });
    }

    // delete
    deleteOne(table, fields, data, callback) {
        let sql = `                
            UPDATE ${table}
            SET ${data}
            WHERE id = ${result[0].id};
        `;
        
        // create table.          
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            err ? callback(err,null) : callback(null, result);
            return;
        });
        return;
    }

     // all records
    all(table, callback) {
        let sql = `
            SELECT * FROM ${table} WHERE deletedAt = 1
        `;
        
        // create table.          
        con.query(sql, function (err, result) {
            // after execute query if error come so return error otherwise return data.
            err ? callback(err,null) : callback(null, result);
            return;
        });
        return;
    }
}

let DBQuery = new QueryClass();
module.exports = DBQuery;