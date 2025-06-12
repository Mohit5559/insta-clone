const DBQuery = require('../../models/query/query');
const config = require('../../../config/config');
const { validationResult } = require('express-validator');
class UploadController{

    // password change
    async uploadFile(req, res){
        try {
            // if file mimetype doesn't match
            let errors = validationResult(req);
            
            if(!errors.isEmpty()){
                // res.json({ 'code':422, 'status':'fail', 'msg':errors.array()[0].msg, 'error': errors, 'data':null});
                res.json({ 'code':422, 'status':'fail', 'msg':'Only jpg, jpeg, png and svg allowed', 'error': errors, 'data':null});
                return;
            }
            
            // update data
            const data = [
                `picture = '${req.file.filename}'`,
            ];
            
            DBQuery.findAndUpdate('users', `id='${req.body.userId}'`, data, function(err,result){
                if (err) {
                    // error handling code goes here.
                    res.json({ 'code':304, 'status':'fail', 'msg':'Not modified', 'error': err.sqlMessage, 'data':null});
                    return;
                } else {
                    DBQuery.findOne('users', 'id', `${req.body.userId}`, function(err,result){
                        if (err) {
                            // error handling code goes here.
                            res.json({ 'code':404, 'status':'fail', 'msg':'User doesn\'t exists', 'error': err.sqlMessage, 'data':false});
                            return;
                        } else {
                            let data = {
                                'img': config.baseUrl + '/profileImg/' + result[0].picture,
                                'details':result
                            }
                            // code to execute on data retrieval.
                            res.json({ 'code':200, 'status':'success', 'msg':'Valide user', 'error':null, 'data': data});
                            return;
                        }
                    });
                    return;
                }
            });
        } catch (error) {
            res.json({ 'code':500, 'status':'fail', 'msg':'Internal server error', 'error': error, 'data':null});
            return;
        }
    }
}

let Upload = new UploadController();
module.exports = Upload;
