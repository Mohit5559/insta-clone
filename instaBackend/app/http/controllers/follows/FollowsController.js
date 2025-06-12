const DBQuery = require('../../models/query/query');
const con = require('../../models/query/query');
const config = require('../../../config/config');

class FollowsController{
    async allRecords(req, res){
        try {
            // query execute for retrieving records.
            DBQuery.all('userfollows', function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':404, 'status':'fail', 'msg':'No record inserted yet', 'error': err.sqlMessage, 'data':false});
                    return;
                } else {
                    // code to execute on data retrieval.
                    res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data': result});
                    return;
                }
            });
        } catch (error) {
            console.log(error);
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
        }
    }

    async follow(req, res){
        // UPDATE `users` SET `id`= 1;
        // define fields accourding to input
        
        const whereClouse = [
            `followedBy='${req.body.userId}' AND followedTo='${req.body.followedId}'`
        ];
        
        // call query class for insert data with callback function which will get error/data after query excution will success.
        DBQuery.findAbsolute('userfollows', whereClouse, function(err,result){
            if (err) {
                // error handling code goes here.
                res.json({ 'code':409, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                return;
            } else {                
                // code to execute on data retrieval.
                if(result.length == 0){
                    // define fields accouding to input
                    let fieldName = "(followedBy, followedTo, follow)";
                    
                    const data = [
                        `'${req.body.userId}'`,
                        `'${req.body.followedId}'`,
                        1,
                    ];                  
                    
                    // call query class for insert data with callback function which will get error/data after query excution will success.
                    DBQuery.create('userfollows', fieldName, data, function(err,result){
                        if (err) {
                            // error handling code goes here.
                            res.json({ 'code':500, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                            return;
                        } else {            
                            // code to execute on data retrieval.
                            res.json({ 'code':201, 'status':'success', 'msg':'You followed this user.', 'error':null, 'data':result});
                            return;
                        }
                    });
                }else{
                    // If user followedup any user so here we are update his followup condition.
                    let data = [];
                    let msg;
                    if(result[0].follow == 0){
                        data = [
                            `follow = 1`,
                        ];
                        msg = "'You followed this user'";
                    }else{
                        data = [
                            `follow = 0`,
                        ];
                        msg = "'You unfollowed this user'";
                    }
                    
                    // call query class for insert data with callback function which will get error/data after query excution will success.
                    DBQuery.findAndUpdate('userfollows', whereClouse, data, function(err,result){
                        if (err) {
                            console.log(err.sqlMessage);
                            // error handling code goes here.
                            res.json({ 'code':409, 'status':'fail', 'msg':'Not modified', 'error':err.sqlMessage, 'data':null});
                            return;
                        } else {
                            // code to execute on data retrieval.
                            res.json({ 'code':201, 'status':'success', 'msg':msg, 'error':null, 'data':result});
                            return;
                        }
                    });
                }
                return;
            }
        });
        return;
    }
}

let Follows = new FollowsController();
module.exports = Follows;
