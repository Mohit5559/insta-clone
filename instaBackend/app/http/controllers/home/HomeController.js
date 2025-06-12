const DBQuery = require('../../models/query/query');
const con = require('../../../config/connectionMysql');
const config = require('../../../config/config');

class HomeController{
    async allRecords(req, res){
        try {
            let sql = `select id, picture, username, displayname from users`;

            let innerSql = `select followedTo from userFollows Where followedBy = ${req.body.userId} and follow = 1`;
            
            con.query(sql, async function (err, users) {
                // after execute query if error come so return error otherwise return data.
                if (err) {
                    // error handling code goes here.
                    await res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                    return;
                }else {
                    con.query(innerSql, async function (err, follows) {
                        // after execute query if error come so return error otherwise return data.
                        if (err) {                                
                            // error handling code goes here.
                            await res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                            return;
                        }else {
                            let data = {
                                "followedTo": follows,
                                "users": users
                            }
                            // code to execute on data retrieval.
                            res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data':  data});
                            return;
                        }
                    });                        
                }
            });
        } catch (error) {
            console.log(error);
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
    }
}

let Home = new HomeController();
module.exports = Home;
