const DBQuery = require('../../models/query/query');
const config = require('../../../config/config');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
class PostUploadController{

    // password change
    async uploadPost(req, res){
        try {
            // if file mimetype doesn't match
            let errors = validationResult(req);
            if(!errors.isEmpty()){
                res.json({ 'code':422, 'status':'fail', 'msg': 'Only mp4 allowed', 'error': errors, 'data':null});
                return;
            }
            
            // update data
            const data = [
                `'${jwt.decode(req.body.userId)?.id}'`,
                `'${req.file.filename}'`,
            ];
            
            // call query class for insert data with callback function which will get error/data after query excution will success.
            DBQuery.create('userposts', "(userId, video)", data, function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':409, 'status':'fail', 'msg':'Post didn\'t create.', 'error':err.sqlMessage, 'data':null});
                    return;
                } else {
                    // code to execute on data retrieval.
                    res.json({ 'code':201, 'status':'success', 'msg':'Post created seccessufully', 'error':null, 'data':result});
                    return;
                }    
            });
            return;
        } catch (error) {
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
            return;
        }
    }
}

let PostUpload = new PostUploadController();
module.exports = PostUpload;
