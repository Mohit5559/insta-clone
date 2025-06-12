const DBQuery = require('../../models/query/query');
const con = require('../../models/query/query');
const config = require('../../../config/config');

class LikesController{
    async allRecords(req, res){
        try {
            // query execute for retrieving records.
            DBQuery.all('userlikes', function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':404, 'status':'fail', 'msg':'No record inserted yet', 'error': err.sqlMessage, 'data':false});
                    return;
                } else {
                    console.log(result);
                    
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

    async like(req, res){
        // UPDATE `users` SET `id`= 1;
        // define fields accourding to input        
        const whereClouse = [
            `userId='${req.body.userId}' AND postId='${req.body.postId}'`
        ];

        // call query class for insert data with callback function which will get error/data after query excution will success.
        DBQuery.findAbsolute('userlikes', whereClouse, function(err,result){
            if (err) {
                // error handling code goes here.
                res.json({ 'code':409, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                return;
            } else {
                // code to execute on data retrieval.
                if(result.length == 0){
                    // define fields accouding to input
                    let fieldName = "(userId, postId, likes)";
                    
                    const data = [
                        `'${req.body.userId}'`,
                        `'${req.body.postId}'`,
                        1,
                    ];

                    // call query class for insert data with callback function which will get error/data after query excution will success.
                    DBQuery.create('userlikes', fieldName, data, function(err,result){
                        if (err) {
                            // error handling code goes here.
                            res.json({ 'code':500, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                            return;
                        } else {            
                            // code to execute on data retrieval.
                            res.json({ 'code':201, 'status':'success', 'msg':'You liked this post.', 'error':null, 'data':result});
                            return;
                        }
                    });
                }else{
                    // If user liked any post so here we are update post's like condition.
                    let data = [];
                    let msg;
                    if(result[0].likes == 0){
                        data = [
                            `likes = 1`,
                        ];
                        msg = "You liked this post";
                    }else{
                        data = [
                            `likes = 0`,
                        ];
                        msg = "You unliked this post";
                    }
                    
                    // call query class for insert data with callback function which will get error/data after query excution will success.
                    DBQuery.findAndUpdate('userlikes', whereClouse, data, function(err,result){
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

let Likes = new LikesController();
module.exports = Likes;
