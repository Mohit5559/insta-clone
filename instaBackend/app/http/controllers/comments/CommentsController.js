const DBQuery = require('../../models/query/query');
const con = require('../../models/query/query');
const config = require('../../../config/config');

class CommentsController{
    async allRecords(req, res){
        try {
            // query execute for retrieving records.
            DBQuery.all('usercomments', function(err,result){
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
    
    async comments(req, res){
        // UPDATE `users` SET `id`= 1;
        // define fields accouding to input
        let fieldName = "(postId, userId, thought)";
        const data = [
            `'${req.body.postId}'`,
            `'${req.body.userId}'`,
            `'${req.body.thought}'`,
        ];

        // call query class for insert data with callback function which will get error/data after query excution will success.
        DBQuery.create('usercomments', fieldName, data, function(err,result){
            if (err) {
                console.log(err.sqlMessage);
                // error handling code goes here.
                res.json({ 'code':409, 'status':'fail', 'msg':'Something went wrong', 'error':err.sqlMessage, 'data':null});
                return;
            } else {            
                // code to execute on data retrieval.
                res.json({ 'code':201, 'status':'success', 'msg':'You comment on this post', 'error':null, 'data':result});
                return;
            }    
        });
        return;
    }
}

let Comments = new CommentsController();
module.exports = Comments;
