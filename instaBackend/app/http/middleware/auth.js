// token validation change
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const DBQuery = require('../models/query/query');

// user authenticate
const verify = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        
        // check header exists
        !header && res.json({'status':404, 'msg':'Not Found', 'error':'Header/Token not found', 'data':null });
        
        // break header to Bearer
        const token = header.split(' ')[1];

        // verify the token
        const userId = jwt.verify(token, config.authKey);
        
        !userId && res.json({'status':401, 'msg':'Unauthorized', 'error':'You are not authenticated', 'data':null });
        
        // user is active or not
        DBQuery.findOne('users', 'id', `${userId.id}`, function(err,result){
            if (err) {
                // error handling code goes here.
                res.json({ 'code':404, 'status':'fail', 'msg':'User doesn\'t exists', 'error': err.sqlMessage, 'data':false});
                return;
            } else {
                // code to execute on data retrieval.
                next();
                return;
            }
        });
    } catch (error) {
        res.json({'status':400, 'msg':'Bad request', 'error':error, 'data':null});
    }
}

module.exports = {verify};