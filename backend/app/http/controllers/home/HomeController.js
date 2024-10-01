const DBQuery = require('../../models/query/query');
const con = require('../../../config/connectionMysql');
const config = require('../../../config/config');

class HomeController{
    async allRecords(req, res){
        try {
            // query execute for retrieving records.
            let sql = `
                    select u.id, u.picture, u.username, uf.follow, uf.userId followId, uf.followedId
                    from users u
                    left join userfollows uf on u.id = uf.userId
                `;
                
                con.query(sql, async function (err, users) {
                // after execute query if error come so return error otherwise return data.
                if (err) {
                    // error handling code goes here.
                    await res.json({ 'code':404, 'status':'fail', 'msg':'No record Found yet', 'error': err.sqlMessage, 'data':false});
                    return;
                }else {
                    // code to execute on data retrieval.
                    res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data':  users});
                    return;
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
